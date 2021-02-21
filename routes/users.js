const users = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');

const {
    getUser,
    updateUser,
} = require('../controllers/users');

users.get('/users/me', auth, getUser);

users.patch('/users/me', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2),
        email: Joi.string().required().email(),
    }),
}), auth, updateUser);

module.exports = users;
