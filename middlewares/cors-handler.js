const { allowedCors, allowedMethods } = require('../config');

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.set('access-control-allow-origin', origin);
  }
  if (req.method === 'OPTIONS') {
    res.set('access-control-allow-methods', allowedMethods);
    console.log(allowedMethods);
    res.set('access-control-allow-headers', req.headers['access-control-request-headers']);
    res.end();
    return;
  }
  next();
};
