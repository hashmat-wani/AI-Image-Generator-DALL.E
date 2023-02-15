import Joi from "joi";
import { Collection, Post, SavedPost, User } from "../../models/index.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import bcrypt from "bcrypt";
import fs from "fs";
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
      const { path: avatar } = req.file;
      let user = await User.findById(userId);

      // remove current avatar from folder
      if (user.avatar && user.avatar.startsWith("uploads"))
        fs.unlinkSync(`${appRoot}/${user.avatar}`, (err) => {
          return next(err);
        });

      user = await User.findByIdAndUpdate(userId, { avatar }, { new: true });
      return res.status(201).json({
        success: true,
        avatar: user.avatar,
        message: "Avatar changed successfully!",
      });
    } catch (err) {
      return next(err);
    }
  },

  async removeAvatar(req, res, next) {
    try {
      const { _id: userId } = req.user;
      let user = await User.findById(userId);

      if (user.avatar && user.avatar.startsWith("uploads")) {
        fs.unlinkSync(`${appRoot}/${user.avatar}`, (err) => {
          return next(err);
        });
      }

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
    } catch (err) {}
  },

  async deactivateUser(req, res, next) {
    try {
      await User.findByIdAndUpdate(req.user?._id, { deactivated: true });
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

      // deleting userPost from cloudinary
      const delPosts = await Post.find({ user: userId });
      delPosts.forEach(async (node) => {
        await cloudinary.uploader.destroy(node.image.id);
      });

      // deleting userPosts from database
      await Post.deleteMany({ user: userId });
      await Collection.deleteMany({ collectionId: userId });

      // deletings userSavedPosts from cloudinary
      const delSavedPosts = await SavedPost.find({ user: userId });
      delSavedPosts.forEach(async (node) => {
        await cloudinary.uploader.destroy(node.image.id);
      });

      // deletings userSavedPosts from databse
      await SavedPost.deleteMany({ user: userId });

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
