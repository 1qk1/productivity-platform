class CustomError extends Error {
  constructor(statusCode, errorMessage) {
    super();
    this.status = statusCode;
    this.message = errorMessage;
  }
}

const errorMiddleware = (req, res, next) => {
  res.handleError = error => res.status(error.status || 400).json({ error });
  next();
};

module.exports = { errorMiddleware, CustomError };
