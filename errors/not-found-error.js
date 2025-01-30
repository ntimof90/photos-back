const HttpError = require('./http-error');

class NotFoundError extends HttpError {
  constructor(message) {
    super(message, 404);
  }
}

module.exports = NotFoundError;
