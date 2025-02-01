const router = require('express').Router();
const {
  getAllUsers,
  getCurrentUser,
  findUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');
const validator = require('../middlewares/validator');

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validator.findUser, findUser);
router.patch('/me', validator.updateUserProfile, updateUserProfile);
router.patch('/me/avatar', validator.updateUserAvatar, updateUserAvatar);

module.exports = router;
