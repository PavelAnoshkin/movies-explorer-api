const mongoose = require('mongoose');
const { regexUrl } = require('../utils/constaints');

const movieSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    year: {
        type: String,
        required: true,
        length: 4,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator(movieImageUrl) {
                return regexUrl.test(movieImageUrl);
            },
            message: 'Некорректная ссылка на постер фильма',
        },
    },
    trailer: {
        type: String,
        required: true,
        validate: {
            validator(movieTrailerUrl) {
                return regexUrl.test(movieTrailerUrl);
            },
            message: 'Некорректная ссылка на трейлер фильма',
        },
    },
    thumbnail: {
        type: String,
        required: true,
        validate: {
            validator(movieThumbnailUrl) {
                return regexUrl.test(movieThumbnailUrl);
            },
            message: 'Некорректная ссылка на мини постер фильма',
        },
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    movieId: {
        type: String,
        required: true,
    },
    nameRU: {
        type: String,
        required: true,
    },
    nameEN: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('movie', movieSchema);
