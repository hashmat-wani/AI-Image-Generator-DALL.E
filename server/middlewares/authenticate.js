import redis from "../config/redis.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import JwtService from "../services/JwtService.js";

export const authenticate = async (req, res, next) => {
  // const token = req.headers?.authorization?.split(" ")[1];

  try {
    const access_token = req.cookies?.access_token?.split(" ")[1];
    const blacklist = await redis.lrange("blacklist", 0, -1);
    // const access_token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q0ZmJiMTczNGU2Y2Y4ODNjZDJkN2IiLCJlbWFpbCI6Imhhc2htYXR3NTU1QGdtYWlsLmNvbSIsImlhdCI6MTY3NTA2ODU3NiwiZXhwIjoxNjc1NjczMzc2fQ.Y7_BbdxHQmKQ14xTBtlhn2VmVcuusW8bvUXX41awf3E";

    // console.log(access_token);
    if (!access_token || blacklist.includes(access_token)) {
      return next(CustomErrorHandler.unAuthorised());
    }
    try {
      const { _id, email } = await JwtService.verify(access_token);
      req.user = { _id, email, access_token };
    } catch (err) {
      return next(err);
    }

    return next();
  } catch (err) {
    return next(CustomErrorHandler.unAuthorised());
  }
};
