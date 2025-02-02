const { allowedCors, allowedMethods } = require('../config');

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
  }
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', allowedMethods);
    res.set('Access-Control-Allow-Headers', req.headers['Access-Control-Request-Headers']);
    res.end();
    return;
  }
  next();
};
