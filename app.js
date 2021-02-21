require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require("helmet");

const router = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorhandler');
const limiter = require('./middlewares/ratelimiter');

const {
    mongoConnection,
    port,
} = require('./utils/sysconstaints');

const { PORT = port } = process.env;

const app = express();

mongoose.connect(mongoConnection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
