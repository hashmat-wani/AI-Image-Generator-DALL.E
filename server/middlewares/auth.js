import CustomErrorHandler from "../services/CustomErrorHandler.js";
import JwtService from "../services/JwtService.js";

export const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorised());
  }

  const token = authHeader.split(" ")[1];

  try {
    const { _id, email } = await JwtService.verify(token);
    req.user = { _id, email };

    return next();
  } catch (err) {
    return next(CustomErrorHandler.unAuthorised());
  }
};
