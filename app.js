const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express(); // const app = require('http').createServer()
mongoose.connect('mongodb://localhost:27017/photosdb', {
  family: 4,
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
