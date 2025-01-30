const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const ConflictError = require('../errors/conflict-error');
const { mongoDublicateErrorCode } = require('../utils');

module.exports = {
  createUser: (req, res, next) => {
    const {
      email,
      password,
      name,
      about,
      avatar,
    } = req.body;
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        email,
        name,
        about,
        avatar,
        password: hash,
      }))
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new ValidationError('Переданы некорректные данные'));
        }
        if (err.code === mongoDublicateErrorCode) {
          next(new ConflictError('Пользователь с такой почтой уже существует'));
        }
        next(err);
      });
  },
  getUserToken: (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email }).select('+password')
      .then((user) => {
        if (!user) {
          throw new NotFoundError('Неправильные почта или пароль');
        }
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              throw new NotFoundError('Неправильные почта или пароль');
            }
            const token = jwt.sign(
              { _id: user._id },
              'dev-key',
              { expiresIn: '7d' },
            );
            res.send({ token });
          });
      })
      .catch(next);
  },
  getAllUsers: (req, res, next) => {
    User.find({})
      .then((users) => res.send(users))
      .catch(next);
  },
  getCurrentUser: (req, res, next) => {
    User.findById(req.user._id)
      .then((user) => {
        if (!user) {
          throw new NotFoundError('Запрашиваемый пользователь не найден');
        }
        res.send(user);
      })
      .catch(next);
  },
};
