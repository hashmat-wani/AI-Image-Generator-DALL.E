import redis from "../config/redis.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import JwtService from "../services/JwtService.js";

export const authenticate = async (req, res, next) => {
  console.log("coming");
  // const token = req.headers?.authorization?.split(" ")[1];

  try {
    const token = req.cookies?.access_token;
    const blacklist = await redis.lrange("blacklist", 0, -1);

    if (!token || blacklist.includes(token)) {
      return next(CustomErrorHandler.unAuthorised());
    }

    const { _id, email } = await JwtService.verify(token);
    req.user = { _id, email };

    return next();
  } catch (err) {
    return next(CustomErrorHandler.unAuthorised());
  }
};
