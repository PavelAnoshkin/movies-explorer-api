const Movie = require('../models/movies');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

const {
    movieCreateErrMessage,
    movieNotFoundErrMessage,
    movieDeleteMessage,
} = require('../utils/constaints');

module.exports.getMovies = (req, res, next) => {
    Movie.find({ owner: req.user._id })
        .populate('owner')
        .then((movies) => res.send({ data: movies }))
        .catch(next);
};

module.exports.createMovie = (req, res, next) => {
    const {
        movieId,
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
    } = req.body;

    Movie.create({
        movieId,
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        owner: req.user._id,
    })
        .then((newMovie) => Movie.findById(newMovie._id)
                .populate('owner')
                .then((foundMovie) => res.send({ data: foundMovie })))
        .catch((err) => {
            if (err._message === 'movie validation failed') {
                throw new BadRequestError(movieCreateErrMessage);
            }

            return next(err);
        })
        .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
    Movie.findOneAndDelete({
        movieId: req.params.movieId,
        owner: req.user._id,
    })
        .then((movie) => {
            if (!movie) {
                throw new NotFoundError(movieNotFoundErrMessage);
            }
            return res.send({ message: movieDeleteMessage });
        })
        .catch(next);
};
