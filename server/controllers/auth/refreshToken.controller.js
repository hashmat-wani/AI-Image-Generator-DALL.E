import { JWT_REFRESH_SECRET } from "../../config/index.js";
import { User } from "../../models/index.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import JwtService from "../../services/JwtService.js";

const refreshTokenController = {
  async refresh(req, res, next) {
    try {
      const refresh_token = req.cookies?.refresh_token?.split(" ")[1];

      if (!refresh_token) {
        return next(CustomErrorHandler.unAuthorised("Invalid refresh token!"));
      }

      let userId;
      try {
        const { _id } = await JwtService.verify(
          refresh_token,
          JWT_REFRESH_SECRET
        );
        userId = _id;
      } catch (err) {
        res
          .clearCookie("access_token", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
          })
          .clearCookie("refresh_token", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
          });
        return next(err);
      }

      const user = await User.findById(userId);
      if (!user) {
        return next(CustomErrorHandler.notFound("User not found"));
      }

      //   generating new access_token
      const access_token = JwtService.sign({ _id: userId, email: user.email });

      res
        .status(200)
        .cookie("access_token", `Bearer ${access_token}`, {
          sameSite: "None",
          httpOnly: true,
          secure: true,
          maxAge: 6 * 60 * 60 * 1000,
        })
        .json({ success: true, message: "New accesstoken generated" });
    } catch (err) {
      return next(err);
    }
  },
};

export default refreshTokenController;
