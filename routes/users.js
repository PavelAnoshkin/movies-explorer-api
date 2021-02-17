const users = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');

const {
    getUsers,
    getUserById,
    getUser,
    updateUser,
    updateUserAvatar,
} = require('../controllers/users');

users.get('/users/me', auth, getUser);

users.patch('/users/me', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        about: Joi.string().required().min(2).max(30),
    }),
}), auth, updateUser);

module.exports = users;
