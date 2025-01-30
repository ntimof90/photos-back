const HttpError = require('./http-error');

class UnauthorizedError extends HttpError {
  constructor(message) {
    super(message, 401);
  }
}

module.exports = UnauthorizedError;
