import Joi from "joi";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import bcrypt from "bcrypt";
import JwtService from "../../services/JwtService.js";
import { User } from "../../models/index.js";
import { v4 as uuidv4 } from "uuid";

import {
  CLIENT_DEV_API,
  CLIENT_PROD_API,
  JWT_REFRESH_SECRET,
  MODE,
} from "../../config/index.js";

const loginController = {
  async login(req, res, next) {
    const { email, password, isPersistent } = req.body;

    // validation
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate({ email, password });

    if (error) {
      return next(error);
    }

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
        "1d",
        JWT_REFRESH_SECRET
      );

      return res
        .status(200)
        .cookie("access_token", `Bearer ${access_token}`, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: isPersistent ? 2 * 24 * 60 * 60 * 1000 : null,
          // days,hours,mins,secs,milisecs.. total-> 2 days
        })
        .cookie("refresh_token", `Bearer ${refresh_token}`, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: isPersistent ? 2 * 24 * 60 * 60 * 1000 : null,
          // days,hours,mins,secs,milisecs.. total-> 2 days
        })
        .json({
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

  async oAuthLogin(firstName, lastName, email, cb, avatar = null) {
    try {
      let user = await User.findOne({ email });

      if (!user) {
        const password = await bcrypt.hash(uuidv4(), 10);
        user = await User.create({
          firstName,
          lastName,
          email,
          password,
          avatar,
        });
      }
      return cb(null, {
        success: true,
        user,
      });
    } catch (err) {
      return cb(err, null);
    }
  },

  async oAuthLoginSuccess(req, res, next) {
    try {
      const { user } = req.user;

      // generate tokens
      const access_token = JwtService.sign({
        _id: user._id,
        email: user.email,
      });

      const refresh_token = JwtService.sign(
        { _id: user._id, email: user.email },
        "1d",
        JWT_REFRESH_SECRET
      );

      return res
        .status(200)
        .cookie("access_token", `Bearer ${access_token}`, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 2 * 24 * 60 * 60 * 1000,
          // days,hours,mins,secs,milisecs.. total-> 2 days
        })
        .cookie("refresh_token", `Bearer ${refresh_token}`, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 2 * 24 * 60 * 60 * 1000,
          // days,hours,mins,secs,milisecs.. total-> 2 days
        })
        .redirect(`${MODE === "dev" ? CLIENT_DEV_API : CLIENT_PROD_API}`);
    } catch (err) {
      return next(err);
    }
  },
};
export default loginController;
