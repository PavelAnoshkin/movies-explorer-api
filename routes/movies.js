const movies = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { regexUrl, regexYear } = require('../utils/constaints');

movies.get('/movies', auth, getMovies);

movies.post('/movies', celebrate({
  body: Joi.object().keys({
    movieId: Joi.string().required(),
    country: Joi.string().required().min(2),
    director: Joi.string().required().min(2),
    duration: Joi.number().integer().required(),
    year: Joi.string().required().pattern(regexYear).length(4),
    description: Joi.string().required().min(2),
    image: Joi.string().required().pattern(regexUrl),
    trailer: Joi.string().required().pattern(regexUrl),
    thumbnail: Joi.string().required().pattern(regexUrl),
    nameRU: Joi.string().required().min(2),
    nameEN: Joi.string().required().min(2),
  }),
}), auth, createMovie);

movies.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required(),
  }),
}), auth, deleteMovie);

module.exports = movies;
