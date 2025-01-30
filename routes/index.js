const router = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./users');
const authHandler = require('../middlewares/auth-handler');

router.use('/', authRouter);
router.use(authHandler);
router.use('/users', userRouter);

module.exports = router;
