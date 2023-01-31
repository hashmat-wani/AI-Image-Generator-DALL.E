import Joi from "joi";
import { User } from "../../models/index.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import bcrypt from "bcrypt";

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
      const user = await User.findByIdAndUpdate(
        userId,
        { avatar },
        { new: true }
      );
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
      const user = await User.findByIdAndUpdate(
        userId,
        { avatar: null },
        { new: true }
      );
      res.status(201).json({
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

      return res
        .status(201)
        .json({ success: true, message: "Password changed successfully" });
    } catch (err) {}
  },
};

export default userController;
