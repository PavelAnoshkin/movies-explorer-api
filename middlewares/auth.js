const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    let token;
    let payload;

    try {
        token = authorization.replace('Bearer ', '');

        if (!authorization || !authorization.startsWith('Bearer ')) {
            return next(new UnauthorizedError('Необходима авторизация'));
        }

        payload = jwt.verify(
            token,
            NODE_ENV === 'production' ? JWT_SECRET : 'ee95c2bccc0d2fbcd12ff16bbbbbac88',
        );
    } catch (e) {
        return next(new UnauthorizedError('Необходима авторизация'));
    }

    req.user = payload;

    return next();
};
