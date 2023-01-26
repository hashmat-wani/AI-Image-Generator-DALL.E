import { DEBUG_MODE } from "../config/index.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import pkg from "joi";
const { ValidationError } = pkg;
// import { ValidationError } from "joi";

export const errorHandler = (err, req, res, next) => {
  // default error
  let statusCode = 500;
  let error = {
    error: true,
    message: "internal server error",
    ...(DEBUG_MODE === "true" && { originalError: err.message }),
  };

  // if Joi validation error
  if (err instanceof ValidationError) {
    statusCode = 422;
    error = { ...error, message: err.message };
  }

  // if custom error
  if (err instanceof CustomErrorHandler) {
    statusCode = err.status;
    error = { ...error, message: err.message };
  }

  return res.status(statusCode).json(error);
};
