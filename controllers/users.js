const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const escape = require('escape-html');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const ConflictError = require('../errors/conflict-error');
const { mongoDublicateErrorCode } = require('../utils');
const { JWT_KEY } = require('../config');

module.exports = {
  createUser: (req, res, next) => {
    const {
      email,
      password,
      name,
      about,
      avatar,
    } = req.body;
    if (!password) {
      throw new ValidationError('Переданы некорректные данные');
    }
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        email,
        name,
        about,
        avatar,
        password: hash,
      }))
      .then((user) => {
        const token = jwt.sign(
          { _id: user._id },
          JWT_KEY,
          { expiresIn: '7d' },
        );
        res.cookie('jwt', token, {
          httpOnly: true,
          sameSite: false,
          maxAge: 3600000 * 24 * 7,
        }).send(user);
      })
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
              JWT_KEY,
              { expiresIn: '7d' },
            );
            res.cookie('jwt', token, {
              httpOnly: true,
              sameSite: false,
              maxAge: 3600000 * 24 * 7,
            }).end();
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
  findUser: (req, res, next) => {
    User.findById(req.params.userId)
      .then((user) => {
        if (!user) {
          throw new NotFoundError('Запрашиваемый пользователь не найден');
        }
        res.send(user);
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          next(new ValidationError('Переданы некорректные данные'));
          return;
        }
        next(err);
      });
  },
  updateUserProfile: (req, res, next) => {
    const { name, about } = req.body;
    if (!name && !about) {
      throw new ValidationError('Переданы некорректные данные');
    }
    User.findByIdAndUpdate(
      req.user._id,
      { name: escape(name), about: escape(about) },
      { runValidators: true, new: true },
    )
      .then((user) => {
        if (!user) {
          throw new NotFoundError('Запрашиваемый пользователь не найден');
        }
        res.send(user);
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new ValidationError('Переданы некорректные данные'));
          return;
        }
        next(err);
      });
  },
  updateUserAvatar: (req, res, next) => {
    const { avatar } = req.body;
    if (!avatar) {
      throw new ValidationError('Переданы некорректные данные');
    }
    User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { runValidators: true, new: true },
    )
      .then((user) => {
        if (!user) {
          throw new NotFoundError('Запрашиваемый пользователь не найден');
        }
        res.send(user);
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new ValidationError('Переданы некорректные данные'));
          return;
        }
        next(err);
      });
  },
};
