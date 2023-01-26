import Joi from "joi";
import { User } from "../../models/index.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import bcrypt from "bcrypt";
// import JwtService from "../../services/JwtService.js";
// import { JWT_REFRESH_SECRET } from "../../config/index.js";

const registerController = {
  async register(req, res, next) {
    // validation
    const schema = Joi.object({
      firstName: Joi.string().min(3).max(30).required(),
      lastName: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
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

      // hash password
      const hashedPwd = await bcrypt.hash(password, 10);

      const payload = {
        firstName,
        lastName,
        email,
        password: hashedPwd,
      };

      // const user = new User(payload);
      // await user.save();

      // or using create method

      const user = await User.create(payload);

      // Token
      // const access_token = JwtService.sign({
      //   _id: user._id,
      //   email: user.email,
      // });
      // const refresh_token = JwtService.sign(
      //   { _id: user._id, email: user.email },
      //   "1y",
      //   JWT_REFRESH_SECRET
      // );

      // database whitelist
      // await RefreshToken.create({ refresh_token });

      res.status(201).json({
        success: true,
        message: "User created Succesfully",
      });
    } catch (err) {
      return next(err);
    }
  },
};

export default registerController;
