// module.exports = (req, res, next) => {
//   const { origin } = req.headers;
//   if (allowedCors.includes(origin)) {
//     res.set('access-control-allow-origin', origin);
//   }
//   if (req.method === 'OPTIONS') {
//     res.set('access-control-allow-methods', allowedMethods);
//     res.set('access-control-allow-headers', req.headers['access-control-request-headers']);
//     res.end();
//     return;
//   }
//   next();
// };

module.exports = (options) => {
  const { origins = '*', methods = 'GET,HEAD,PUT,PATCH,POST,DELETE' } = options;
  return (req, res, next) => {
    const { origin } = req.headers;
    if (origins === '*') res.set('access-control-allow-origin', origins);
    if (origins.includes(origin)) {
      res.set('access-control-allow-origin', origin);
    }
    if (req.method === 'OPTIONS') {
      res.set('access-control-allow-credentials', 'true');
      res.set('access-control-allow-methods', methods);
      res.set('access-control-allow-headers', req.headers['access-control-request-headers']);
      res.end();
      return;
    }
    next();
  };
};
