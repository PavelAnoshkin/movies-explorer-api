const regexUrl = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/i;
const regexYear = /^[0-9]{4}$/i;

const routeNotFoundErrMessage = 'Указанный ресурс не найден';
const loginErrMessage = 'Неправильные почта или пароль';
const authFailErrMessage = 'Необходима авторизация';
const serverErrMessage = 'На сервере произошла ошибка';
const tooManyRequestsErrMessage = 'Слишком много запросов с данного IP. Попробуйте снова через 1 минуту.';
const userNotFoundErrMessage = 'Пользователь не найден';
const userCreateErrMessage = 'Переданы некорректные данные в метод создания пользователя';
const userEmailConflictErrMessage = 'Пользователь с таким e-mail уже зарегистирован';
const movieCreateErrMessage = 'Переданы некорректные данные в метод создания карточки фильма';
const movieNotFoundErrMessage = 'Карточка фильма не найдена';
const movieDeleteMessage = 'Карточка фильма удалена';
const movieCreateConflictErrMessage = 'Карточка фильма уже добавлена';
const movieDeleteForbiddedErrMessage = 'Запрещено удалять чужие карточки фильмов';

module.exports = {
  regexUrl,
  regexYear,
  routeNotFoundErrMessage,
  loginErrMessage,
  authFailErrMessage,
  serverErrMessage,
  tooManyRequestsErrMessage,
  userNotFoundErrMessage,
  userCreateErrMessage,
  userEmailConflictErrMessage,
  movieCreateErrMessage,
  movieNotFoundErrMessage,
  movieDeleteMessage,
  movieCreateConflictErrMessage,
  movieDeleteForbiddedErrMessage,
};
