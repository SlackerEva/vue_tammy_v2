const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { errors } = require('celebrate');
const routes = require('./routes/index');
//const session = require('express-session');
const { middleError } = require('./middlewares/middleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not_found_error');

const { PORT = 3002, MONGO_URL = 'mongodb://localhost:27017/Tammy' } = process.env;
const app = express();

app.use(cors()); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestLogger);
app.use(routes);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.all('*', () => {
  throw new NotFoundError('Такой страницы не существует');
});

app.use(errorLogger);
app.use(errors());
app.use(middleError);

async function start() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true
    })
    app.listen(PORT, () => {
      console.log('Server has been started ' + MONGO_URL)
    })
  } catch(e) {
    console.log(e);
  }
}

start();