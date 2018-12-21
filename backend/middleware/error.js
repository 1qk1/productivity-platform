class CustomError extends Error {
  constructor(statusCode, errorMessage) {
    super();
    this.message = errorMessage;
    this.status = statusCode;
  }
}

const errorMiddleware = (req, res, next) => {
  res.handleError = error => res.status(error.status).json({ error });
  next();
};

module.exports = { errorMiddleware, CustomError };
