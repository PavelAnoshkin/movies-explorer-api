const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const UnauthorizedError = require('../errors/unauthorized-err');

const { authFailErrMessage } = require('../utils/constaints');
const { jwtDev } = require('../utils/sysconstaints');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  let token;
  let payload;

  try {
    token = authorization.replace('Bearer ', '');

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return next(new UnauthorizedError(authFailErrMessage));
    }

    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : jwtDev,
    );
  } catch (e) {
    return next(new UnauthorizedError(authFailErrMessage));
  }

  req.user = payload;

  return next();
};
