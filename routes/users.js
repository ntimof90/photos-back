const router = require('express').Router();
const { getAllUsers, getCurrentUser } = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);

module.exports = router;
