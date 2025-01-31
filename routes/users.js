const router = require('express').Router();
const {
  getAllUsers,
  getCurrentUser,
  findUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', findUser);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
