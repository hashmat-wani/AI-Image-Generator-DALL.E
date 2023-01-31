class CustomErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static validationError(message = "All fields are required!") {
    return new CustomErrorHandler(422, message);
  }

  static invalidCredentials(message = "Invalid credentials!") {
    return new CustomErrorHandler(401, message);
  }

  static unAuthorised(message = "Unauthorised!") {
    return new CustomErrorHandler(401, message);
  }

  static notFound(message = "404 Not found!") {
    return new CustomErrorHandler(404, message);
  }

  static serverError(message = "Internal server error!") {
    return new CustomErrorHandler(500, message);
  }

  static forbidden(message = "Not allowed!") {
    return new CustomErrorHandler(403, message);
  }

  static alreadyExist(message = "Already exist!") {
    return new CustomErrorHandler(409, message);
  }
}

export default CustomErrorHandler;
