import CustomErrorHandler from "../services/CustomErrorHandler.js";
import JwtService from "../services/JwtService.js";

export const authenticate = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return next(CustomErrorHandler.unAuthorised());
  }

  // implement blacklisting here ---------- pending

  try {
    const { _id, email } = await JwtService.verify(token);
    req.user = { _id, email };

    return next();
  } catch (err) {
    return next(CustomErrorHandler.unAuthorised());
  }
};
