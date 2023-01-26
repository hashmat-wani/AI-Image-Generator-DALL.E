import Joi from "joi";
import { JWT_REFRESH_SECRET } from "../../config/index.js";
import { RefreshToken, User } from "../../models/index.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import JwtService from "../../services/JwtService.js";

const refreshTokenController = {
  async refresh(req, res, next) {
    // validation
    const schema = Joi.object({
      refresh_token: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return next(error);
    }

    // checking if token is there in database.
    // if it's not present then user has loggedout
    try {
      const refreshToken = await RefreshToken.findOne({
        refresh_token: req.body.refresh_token,
      });

      if (!refreshToken) {
        return next(CustomErrorHandler.unAuthorised("Invalid refresh token!"));
      }

      let userId;
      try {
        const { _id } = await JwtService.verify(
          refreshToken.refresh_token,
          JWT_REFRESH_SECRET
        );
        userId = _id;
      } catch (err) {
        return next(err);
      }

      const user = await User.findById(userId);
      if (!user) {
        return next(CustomErrorHandler.notFound("User not found"));
      }

      // before generating a new refresh token
      // its good to delete existing refresh token from database
      // const refresh_token = JwtService.sign(
      //   { _id: userId, email: user.email },
      //   "1y",
      //   JWT_REFRESH_SECRET
      // );
      // RefreshToken.create({ refresh_token });

      //   generating new access_token
      const access_token = JwtService.sign({ _id: userId, email: user.email });

      //   database whitelist

      res.status(201).json({ success: true, access_token });
    } catch (err) {
      return next(err);
    }
  },
};

export default refreshTokenController;
