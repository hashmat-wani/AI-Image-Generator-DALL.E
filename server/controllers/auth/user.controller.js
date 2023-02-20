import Joi from "joi";
import { Collection, Post, SavedPost, User } from "../../models/index.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import bcrypt from "bcrypt";
import cloudinary from "../../config/cloudinary.js";

const userController = {
  async me(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.user._id }).select(
        "-password -updatedAt"
      );

      if (!user) {
        return next(CustomErrorHandler.notFound());
      }
      res.status(200).json({ success: true, user });
    } catch (err) {
      return next(err);
    }
  },

  async updateAvatar(req, res, next) {
    try {
      const { _id: userId } = req.user;
      const { buffer } = req?.file;

      // remove current avatar from folder
      // if (user.avatar && user.avatar.startsWith("uploads"))
      //   fs.unlinkSync(`${appRoot}/${user.avatar}`, (err) => {
      //     return next(err);
      //   });
      // Adding new avatar to cloudinary
      const uri = `data:text/plain;charset=utf-8;base64,${buffer.toString(
        "base64"
      )}`;
      const image = await cloudinary.uploader.upload(uri);

      // removing old avatar from cloudinary
      let user = await User.findById(userId);
      if (user?.avatar) {
        await cloudinary.uploader.destroy(user.avatar?.id);
      }
      user = await User.findByIdAndUpdate(
        userId,
        { avatar: { url: image.secure_url, id: image.public_id } },
        { new: true }
      );

      return res.status(201).json({
        success: true,
        avatar: user?.avatar,
        message: "Avatar changed successfully!",
      });
    } catch (err) {
      return next(err);
    }
  },

  async removeAvatar(req, res, next) {
    try {
      const { _id: userId } = req.user;

      // removing old avatar from cloudinary
      let user = await User.findById(userId);
      const oldAvatar = user.avatar?.id;
      await cloudinary.uploader.destroy(oldAvatar);

      // if (user.avatar && user.avatar.startsWith("uploads")) {
      //   fs.unlinkSync(`${appRoot}/${user.avatar}`, (err) => {
      //     return next(err);
      //   });
      // }

      user = await User.findByIdAndUpdate(
        userId,
        { avatar: null },
        { new: true }
      );

      return res.status(201).json({
        success: true,
        avatar: user.avatar,
        message: "Avatar removed!",
      });
    } catch (err) {
      return next(err);
    }
  },

  async changePassword(req, res, next) {
    // validation
    const validationSchema = Joi.object({
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().required(),
    });

    const { error } = validationSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      const { _id: userId } = req.user;
      const { oldPassword, newPassword } = req.body;
      const user = await User.findById(userId);
      const match = await bcrypt.compare(oldPassword, user.password);
      if (!match) {
        return next(
          CustomErrorHandler.invalidCredentials("Wrong old password!")
        );
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.findByIdAndUpdate(userId, { password: hashedPassword });

      return res.status(201).json({
        success: true,
        message: "Password changed successfully. Please login again..!",
      });
    } catch (err) {
      return next(err);
    }
  },

  async resetPassword(req, res, next) {
    // validation
    const { newPassword } = req.body;
    const validationSchema = Joi.object({
      newPassword: Joi.string().required(),
    });

    const { error } = validationSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      const reset_token = req?.cookies?.reset_token;
      if (!reset_token) {
        return next(CustomErrorHandler.unAuthorised("Invalid Link!"));
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const user = await User.findOneAndUpdate(
        {
          "resetToken.token": reset_token,
          "resetToken.expiresIn": { $gt: Date.now() },
        },
        { password: hashedPassword, resetToken: null },
        { new: true }
      );
      if (!user) {
        return next(CustomErrorHandler.invalidCredentials("Link has expired."));
      }

      return res
        .status(201)
        .clearCookie("reset_token", {
          sameSite: "None",
          secure: true,
          httpOnly: true,
        })
        .json({
          success: true,
          message: "Password changed successfully..!",
        });
    } catch (err) {
      return next(err);
    }
  },

  async deactivateUser(req, res, next) {
    try {
      await User.findByIdAndUpdate(req.user?._id, { isActive: false });
      return res
        .status(200)
        .json({ success: true, message: "Account deactivated successfully" });
    } catch (err) {
      return next(err);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const { _id: userId } = req?.user;

      // deleting userAvatar from cloudinary
      const user = await User.findById(userId);
      if (user?.avatar) {
        await cloudinary.uploader.destroy(user.avatar?.id);
      }

      // deleting userPost from cloudinary
      const delPosts = await Post.find({ user: userId });
      delPosts.forEach(async (node) => {
        await cloudinary.uploader.destroy(node.image.id);
      });

      // deleting userPosts from database
      await Post.deleteMany({ user: userId });

      // deletings userSavedPosts from cloudinary
      const delSavedPosts = await SavedPost.find({ user: userId });
      delSavedPosts.forEach(async (node) => {
        await cloudinary.uploader.destroy(node.image.id);
      });

      // deletings userSavedPosts from databse
      await SavedPost.deleteMany({ user: userId });

      // deletings userCollections from databse
      await Collection.deleteMany({ user: userId });

      // Finally deleting user
      await User.findByIdAndDelete(userId);

      return res
        .status(200)
        .json({ success: true, message: "Account deleted successfully" });
    } catch (err) {
      return next(err);
    }
  },
};

export default userController;
