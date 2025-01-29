const bcrypt = require('bcryptjs');
const User = require('../models/user');

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
        next(err);
      });
  },
};
