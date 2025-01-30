const HttpError = require('./http-error');

class ValidationError extends HttpError {
  constructor(message) {
    super(message, 400);
  }
}

module.exports = ValidationError;
