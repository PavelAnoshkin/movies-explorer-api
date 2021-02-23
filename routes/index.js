const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { loginUser, createUser } = require('../controllers/users');

const NotFoundError = require('../errors/not-found-err');
const { routeNotFoundErrMessage } = require('../utils/constaints');

const users = require('./users');
const movies = require('./movies');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), loginUser);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), createUser);

router.use('/', users);
router.use('/', movies);

router.use((req, res, next) => next(new NotFoundError(routeNotFoundErrMessage)));

module.exports = router;
