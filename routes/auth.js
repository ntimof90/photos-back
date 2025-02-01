const router = require('express').Router();
const { createUser, getUserToken } = require('../controllers/users');
const validator = require('../middlewares/validator');

router.post('/signup', validator.createUser, createUser);
router.post('/signin', validator.getUserToken, getUserToken);

module.exports = router;
