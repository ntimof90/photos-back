const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const router = require('./routes');
const errorHandler = require('./middlewares/error-handler');

const app = express(); // const app = require('http').createServer()
mongoose.connect('mongodb://localhost:27017/photosdb', {
  family: 4,
});
app.use(express.json());
app.use(router);
app.use(errorHandler);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
