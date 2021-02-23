const rateLimit = require('express-rate-limit');

const { tooManyRequestsErrMessage } = require('../utils/constaints');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message: tooManyRequestsErrMessage,
});

module.exports = limiter;
