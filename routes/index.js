const router = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./users');
const authHandler = require('../middlewares/auth-handler');
const cardRouter = require('./cards');
const NotFoundError = require('../errors/not-found-error');

router.use('/', authRouter);
router.use(authHandler);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
