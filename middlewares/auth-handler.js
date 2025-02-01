const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const { JWT_KEY } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    next(new UnauthorizedError('Требуется авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, JWT_KEY, (err, payload) => {
    if (err) {
      next(new UnauthorizedError('Требуется авторизация'));
    }
    req.user = payload;
  });
  next();
};
