import Joi from "joi";
import { REFRESH_SECRET } from "../../config/index.js";
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
          REFRESH_SECRET
        );
        userId = _id;
      } catch (err) {
        return next(err);
      }

      const user = await User.findById(userId);
      if (!user) {
        return next(CustomErrorHandler.notFound("User not found"));
      }

      //   generating tokens

      const access_token = JwtService.sign({ _id: userId, email: user.email });
      const refresh_token = JwtService.sign(
        { _id: userId, email: user.email },
        "1y",
        REFRESH_SECRET
      );

      //   database whitelist
      RefreshToken.create({ refresh_token });

      res.status(200).json({ access_token, refresh_token });
    } catch (err) {
      return next(err);
    }
  },
};

export default refreshTokenController;
