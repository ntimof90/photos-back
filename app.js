const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const router = require('./routes');

const app = express(); // const app = require('http').createServer()
mongoose.connect('mongodb://localhost:27017/photosdb', {
  family: 4,
});
app.use(express.json());
app.use(router);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
