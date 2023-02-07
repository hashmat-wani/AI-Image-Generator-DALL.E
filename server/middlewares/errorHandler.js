import { MODE } from "../config/index.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import pkg from "joi";
const { ValidationError } = pkg;

export const errorHandler = (err, req, res, next) => {
  // default error
  let statusCode = 500;
  let error = {
    error: true,
    // message: err.message,
    message: `${MODE === "dev" ? err.message : "Internal server error"}`,
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
