require('dotenv').config();

const {
  NODE_ENV, JWT_KEY, PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/photosdb',
} = process.env;
const allowedCors = [
  'http://localhost:3000',
  'http://coast.students.nomoredomainsmonster.ru',
];

module.exports = {
  PORT,
  MONGO_URL,
  JWT_KEY: NODE_ENV === 'production' ? JWT_KEY : 'dev-key',
  allowedCors,
};
