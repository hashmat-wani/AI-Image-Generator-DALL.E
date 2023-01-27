import Joi from "joi";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import bcrypt from "bcrypt";
import JwtService from "../../services/JwtService.js";
import { RefreshToken, User } from "../../models/index.js";
import { JWT_REFRESH_SECRET } from "../../config/index.js";

const loginController = {
  async login(req, res, next) {
    // validation
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      // if user is present
      if (!user) {
        return next(
          CustomErrorHandler.invalidCredentials("Invalid email or password!")
        );
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return next(
          CustomErrorHandler.invalidCredentials("Invalid email or password!")
        );
      }

      //   generate token
      const access_token = JwtService.sign({
        _id: user._id,
        email: user.email,
      });

      const refresh_token = JwtService.sign(
        { _id: user._id, email: user.email },
        "28d",
        JWT_REFRESH_SECRET
      );

      //   database whitelist
      // await RefreshToken.create({ refresh_token });
      res.cookie("access_token", access_token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });

      return res.status(200).json({
        success: true,
        user: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    } catch (err) {
      return next(err);
    }
  },
};
export default loginController;
