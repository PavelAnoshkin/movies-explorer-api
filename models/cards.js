const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    link: {
        type: String,
        required: true,
        validate: {
            validator(avatarUrl) {
                const regex = /^https?:\/\/(w{3}\.)?[0-9a-z.]+[a-z0-9\-._~:/?#[\]@!$&'()*+,;=%]*#?$/gi;
                return regex.test(avatarUrl);
            },
            message: 'Некорректная ссылка',
        },
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    likes: [],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('card', cardSchema);
