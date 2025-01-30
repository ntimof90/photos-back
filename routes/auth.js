const router = require('express').Router();
const { createUser, getUserToken } = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', getUserToken);

module.exports = router;
