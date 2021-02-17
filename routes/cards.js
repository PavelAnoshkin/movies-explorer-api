const cards = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');

const {
    getCards,
    createCard,
    deleteCard,
    likeCard,
    dislikeCard,
} = require('../controllers/cards');

cards.get('/cards', auth, getCards);

cards.post('/cards', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        link: Joi.string().required().pattern(/^https?:\/\/(w{3}\.)?[0-9a-z.]+[a-z0-9\-._~:/?#[\]@!$&'()*+,;=%]*#?$/i),
    }),
}), auth, createCard);

cards.delete('/cards/:cardId', celebrate({
    params: Joi.object().keys({
        cardId: Joi.string().length(24),
    }),
}), auth, deleteCard);

cards.put('/cards/:cardId/likes', celebrate({
    params: Joi.object().keys({
        cardId: Joi.string().length(24),
    }),
}), auth, likeCard);

cards.delete('/cards/:cardId/likes', celebrate({
    params: Joi.object().keys({
        cardId: Joi.string().length(24),
    }),
}), auth, dislikeCard);

module.exports = cards;
