import ErrorHandler from "../errors/ErrorHandler.js";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    return res.status(err.status).json({
      error: {
        message: err.message,
        status: err.status,
      },
    });
  } else {
    return res.status(500).jsno({
      error: {
        message: err.message,
        status: err.status,
      },
    });
  }
};
