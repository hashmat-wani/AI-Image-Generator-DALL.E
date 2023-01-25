import Joi from "joi";
import { RefreshToken } from "../../models/index.js";

const logoutController = {
  async logout(req, res, next) {
    // validation
    const schema = Joi.object({
      refresh_token: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return next(error);
    }

    try {
      await RefreshToken.deleteOne({ refresh_token: req.body.refresh_token });
      res.json({ message: "Logged Out" });
    } catch (err) {
      return next(err);
    }
  },
};

export default logoutController;
