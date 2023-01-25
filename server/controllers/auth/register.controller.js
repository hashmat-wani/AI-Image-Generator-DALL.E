import Joi from "joi";
import { RefreshToken, User } from "../../models/index.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import bcrypt from "bcrypt";
import JwtService from "../../services/JwtService.js";
import { REFRESH_SECRET } from "../../config/index.js";

const registerController = {
  async register(req, res, next) {
    // validation
    const schema = Joi.object({
      firstName: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(
        new RegExp(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      ),
      confirmPassword: Joi.ref("password"),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return next(error);
    }

    // check if user already exists;
    const { firstName, lastName, email, password } = req.body;
    try {
      const exist = await User.exists({ email });
      if (exist) {
        return next(
          CustomErrorHandler.alreadyExist("This email is already taken")
        );
      }
    } catch (err) {
      return next(err);
    }

    // hash password

    const hashedPwd = await bcrypt.hash(password, 10);

    try {
      const payload = {
        firstName,
        lastName,
        email,
        password: hashedPwd,
      };

      // const instance = new User(payload);
      // const user = await instance.save();

      // or using create method

      const user = await User.create(payload);

      // Token
      const access_token = JwtService.sign({
        _id: user._id,
        email: user.email,
      });
      const refresh_token = JwtService.sign(
        { _id: user._id, email: user.email },
        "1y",
        REFRESH_SECRET
      );

      // database whitelist
      await RefreshToken.create({ refresh_token });

      res.status(200).json({ access_token, refresh_token });
    } catch (err) {
      return next(err);
    }
  },
};

export default registerController;
