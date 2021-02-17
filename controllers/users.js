const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

//создать ENV
const { NODE_ENV, JWT_SECRET } = process.env;

const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');

module.exports.getUser = (req, res, next) => {
    User.findOne({ _id: req.user._id })
        .then((user) => {
            if (!user) {
                throw new NotFoundError('Пользователь не найден');
            }
            return res.send({ data: user });
        })
        .catch(next);
};

module.exports.createUser = (req, res, next) => {
    const {
        name,
        email,
        password,
    } = req.body;

    bcrypt.hash(password, 10)
        .then((hash) => User.create({
            name, email, password: hash,
        }))
        .then((newUser) => {
            User.findById(newUser._id)
                .then((foundUser) => res.send({ data: foundUser }))
        })
        .catch((err) => {
            if (err._message === 'user validation failed') {
                throw new BadRequestError('Переданы некорректные данные в метод создания пользователя');
            }

            if (err.name === 'MongoError' && err.code === 11000) {
                throw new ConflictError('Пользователь с таким e-mail уже зарегистирован');
            }

            return next(err);
        })
        .catch(next);
};

module.exports.updateUser = (req, res, next) => {
    const {
        name,
        email,
    } = req.body;

    User.findByIdAndUpdate(
        req.user._id,
        {
            name,
            email,
        },
        {
            new: true,
            runValidators: true,
        },
    )
        .then((updatedUser) => {
            if (!updatedUser) {
                throw new NotFoundError('Пользователь не найден');
            }
            return res.send({ data: updatedUser });
        })
        .catch((err) => {
            if (err._message === 'user validation failed') {
                throw new BadRequestError('Переданы некорректные данные в метод создания пользователя');
            }
            return next(err);
        })
        .catch(next);
};

module.exports.loginUser = (req, res, next) => {
    const { email, password } = req.body;

    return User.findUserByCredentials(email, password)
        .then((user) => {
            const token = jwt.sign(
                { _id: user._id },
                // JWT_SECRET_DEV в отдельный файл
                NODE_ENV === 'production' ? JWT_SECRET : 'ee95c2bccc0d2fbcd12ff16bbbbbac88',
                { expiresIn: '7d' },
            );

            res.send({ token });
        })
        .catch((err) => {
            if (err.message === 'Неправильные почта или пароль') {
                throw new UnauthorizedError(err.message);
            }
            return next(err);
        })
        .catch(next);
};
