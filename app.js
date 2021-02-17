require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');

//const { login, createUser } = require('./controllers/users');
//const { requestLogger, errorLogger } = require('./middlewares/logger');

//const NotFoundError = require('./errors/not-found-err');

//const users = require('./routes/users.js');
//const cards = require('./routes/cards.js');

const { PORT = 3000 } = process.env;

const app = express();

//вынести адрес подключения к базе в отдеотный файл
mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

app.use(cors());
app.use(bodyParser.json());

//app.use(requestLogger);

/*
app.get('/crash-test', () => {
    setTimeout(() => {
        throw new Error('Сервер сейчас упадёт');
    }, 0);
});
*/

/*
app.post('/signin', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
    }),
}), login);
*/

/*
app.post('/signup', celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().pattern(/^https?:\/\/(w{3}\.)?[0-9a-z.]+[a-z0-9\-._~:/?#[\]@!$&'()*+,;=%]*#?$/i),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
    }),
}), createUser);
*/

//app.use('/', users);
//app.use('/', cards);

//app.use((req, res, next) => next(new NotFoundError('Указанный ресурс не найден')));

//app.use(errorLogger);

//app.use(errors());

app.use((err, req, res, next) => {
    const { statusCode = 500, message } = err;
    res
        .status(statusCode)
        .send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });

    next();
});

app.listen(PORT);
