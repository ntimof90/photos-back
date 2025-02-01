const router = require('express').Router();
const {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const validator = require('../middlewares/validator');

router.get('/', getAllCards);
router.post('/', validator.createCard, createCard);
router.delete('/:cardId', validator.findCardById, deleteCard);
router.put('/:cardId/likes', validator.findCardById, likeCard);
router.delete('/:cardId/likes', validator.findCardById, dislikeCard);

module.exports = router;
