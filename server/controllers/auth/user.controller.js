import { User } from "../../models/index.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";

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
    const { _id: userId } = req.user;
    const { path: avatar } = req.file;
    try {
      const user = await User.findByIdAndUpdate(userId, { avatar });
      return res.status(204).json({ success: true, data: user.avatar });
    } catch (err) {
      return next(err);
    }
  },

  async removeAvatar(req, res, next) {
    try {
      const { _id: userId } = req.user;
      const user = await User.findByIdAndUpdate(userId, { avatar: null });
      res.status(204).json({ success: true, data: user.avatar });
    } catch (err) {
      return next(err);
    }
  },
};

export default userController;
