const mongoose = require('mongoose');

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
                //вынести ее в отдельный файл заменить на ссылку из инета
                const regex = /^https?:\/\/(w{3}\.)?[0-9a-z.]+[a-z0-9\-._~:/?#[\]@!$&'()*+,;=%]*#?$/gi;
                return regex.test(movieImageUrl);
            },
            message: 'Некорректная ссылка на постер фильма',
        },
    },
    trailer: {
        type: String,
        required: true,
        validate: {
            validator(movieTrailerUrl) {
                //вынести ее в отдельный файл заменить на ссылку из инета
                const regex = /^https?:\/\/(w{3}\.)?[0-9a-z.]+[a-z0-9\-._~:/?#[\]@!$&'()*+,;=%]*#?$/gi;
                return regex.test(movieTrailerUrl);
            },
            message: 'Некорректная ссылка на трейлер фильма',
        },
    },
    thumbnail: {
        type: String,
        required: true,
        validate: {
            validator(movieThumbnailUrl) {
                //вынести ее в отдельный файл заменить на ссылку из инета
                const regex = /^https?:\/\/(w{3}\.)?[0-9a-z.]+[a-z0-9\-._~:/?#[\]@!$&'()*+,;=%]*#?$/gi;
                return regex.test(movieThumbnailUrl);
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
