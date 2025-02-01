const { celebrate, Joi } = require('celebrate');
const { urlRegExp } = require('../utils');

module.exports = {
  createUser: celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(urlRegExp),
    }),
  }),
  getUserToken: celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  findUser: celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().length(24),
    }),
  }),
  updateUserProfile: celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUserAvatar: celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(urlRegExp),
    }),
  }),
  createCard: celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().pattern(urlRegExp).required(),
    }),
  }),
  findCardById: celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
};
