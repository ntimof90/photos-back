const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const Card = require('../models/card');

module.exports = {
  getAllCards: (req, res, next) => {
    Card.find({})
      .then((cards) => {
        res.send(cards);
      })
      .catch(next);
  },
  createCard: (req, res, next) => {
    const { name, link } = req.body;
    Card.create({ name, link, owner: req.user._id })
      .then((card) => res.send(card))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new ValidationError('Переданы некорректные данные'));
        }
        next(err);
      });
  },
  deleteCard: (req, res, next) => {
    Card.findByIdAndDelete(req.params.cardId)
      .then((card) => {
        if (!card) {
          throw new NotFoundError('Запрашиваемая карточка не найдена');
        }
        if (req.user._id !== card.owner.toString()) {
          throw new ForbiddenError('Недостаточно прав для удаления');
        }
        res.send(card);
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          next(new ValidationError('Переданы некорректные данные'));
        }
        next(err);
      });
  },
  likeCard: (req, res, next) => {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .then((card) => {
        if (!card) {
          throw new NotFoundError('Запрашиваемая карточка не найдена');
        }
        res.send(card);
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          next(new ValidationError('Переданы некорректные данные'));
        }
        next(err);
      });
  },
  dislikeCard: (req, res, next) => {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .then((card) => {
        if (!card) {
          throw new NotFoundError('Запрашиваемая карточка не найдена');
        }
        res.send(card);
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          next(new ValidationError('Переданы некорректные данные'));
        }
        next(err);
      });
  },
};
