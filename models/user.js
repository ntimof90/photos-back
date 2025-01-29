const { Schema, model } = require('mongoose');
const { isURL } = require('validator');
// const { urlRexExp } = require('../utils');

const userSchema = new Schema({
  email: {
    required: true,
    type: String,
    validate: {
      validator: isURL,
      message: 'Переданы некорректные данные(email)',
    },
    unique: true,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    // validate: {
    //   validator(v) {
    //     return true;
    //   },
    //   message: 'Переданы некорректные данные(avatar)',
    // },
  },
}, { versionKey: false });

module.exports = model('user', userSchema);
