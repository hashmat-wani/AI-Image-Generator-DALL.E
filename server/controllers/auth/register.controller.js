import Joi from "joi";
import { User, Collection } from "../../models/index.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import bcrypt from "bcrypt";

const registerController = {
  async register(req, res, next) {
    const { firstName, lastName, email, password } = req.body;

    // validation
    const schema = Joi.object({
      firstName: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { error } = schema.validate({ firstName, email, password });

    if (error) {
      return next(error);
    }

    // check if user already exists;
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
        ...(lastName && { lastName }),
        email,
        password: hashedPwd,
      };

      // const user = new User(payload);
      // await user.save();

      // or using create method

      const user = await User.create(payload);
      await Collection.create({
        name: "Favorites",
        slug: "favorites",
        user: user._id,
      });
      res.status(201).json({
        success: true,
        message: "Account created Succesfully..!",
      });
    } catch (err) {
      return next(err);
    }
  },
};

export default registerController;
