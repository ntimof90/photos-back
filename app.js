const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const rateLimiter = require('express-rate-limit');

const router = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const { MONGO_URL, PORT, allowedCors } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsHandler = require('./middlewares/cors-handler');

const app = express(); // const app = require('http').createServer()
mongoose.connect(MONGO_URL, {
  family: 4,
});
app.use(corsHandler({ origins: allowedCors }));
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(requestLogger);
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
