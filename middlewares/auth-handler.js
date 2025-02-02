const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const { JWT_KEY } = require('../config');

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;
  if (!token) {
    next(new UnauthorizedError('Требуется авторизация'));
  }
  jwt.verify(token, JWT_KEY, (err, payload) => {
    if (err) {
      next(new UnauthorizedError('Требуется авторизация'));
    }
    req.user = payload;
  });
  next();
};
