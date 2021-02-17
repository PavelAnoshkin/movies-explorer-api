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

users.patch('/users/me/avatar', celebrate({
    body: Joi.object().keys({
        avatar: Joi.string().required().pattern(/^https?:\/\/(w{3}\.)?[0-9a-z.]+[a-z0-9\-._~:/?#[\]@!$&'()*+,;=%]*#?$/i),
    }),
}), auth, updateUserAvatar);

users.get('/users', auth, getUsers);

users.get('/users/:id', celebrate({
    params: Joi.object().keys({
        id: Joi.string().length(24),
    }),
}), auth, getUserById);

module.exports = users;
