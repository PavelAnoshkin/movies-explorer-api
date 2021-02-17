const Card = require('../models/cards');

const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.getCards = (req, res, next) => {
    Card.find({})
        .populate('owner')
        .then((cards) => res.send({ data: cards }))
        .catch(next);
};

module.exports.createCard = (req, res, next) => {
    const { name, link } = req.body;

    Card.create({ name, link, owner: req.user._id })
        .then((newCard) => Card.findById(newCard._id)
                .populate('owner')
                .then((foundCard) => res.send({ data: foundCard })))
        .catch((err) => {
            if (err._message === 'card validation failed') {
                return res.status(400).send({ message: 'Переданы некорректные данные в метод создания карточки' });
            }

            return next(err);
        })
        .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
    Card.findById(req.params.cardId)
        .then((card) => {
            if (!card) {
                throw new NotFoundError('Карточка не найдена');
            }
            if (card.owner._id.toString() !== req.user._id) {
                throw new ForbiddenError('Запрещено удалять чужие карточки');
            }

            return Card.findByIdAndRemove(req.params.cardId)
                .then((deletedCard) => {
                    if (!deletedCard) {
                        throw new NotFoundError('Карточка не найдена');
                    }
                    return res.send({ message: 'Карточка удалена' });
                });
        })
        .catch(next);
};

module.exports.likeCard = (req, res, next) => {
    Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true },
    )
        .populate('owner')
        .then((card) => {
            if (!card) {
                throw new NotFoundError('Карточка не найдена');
            }
            return res.send({ data: card });
        })
        .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
    Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } },
        { new: true },
    )
        .populate('owner')
        .then((card) => {
            if (!card) {
                throw new NotFoundError('Карточка не найдена');
            }
            return res.send({ data: card });
        })
        .catch(next);
};
