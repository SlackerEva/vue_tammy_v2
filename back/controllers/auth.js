const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const NotFoundError = require('../errors/not_found_error.js');
const ValidationError = require('../errors/validation_error.js');
const AuthError = require('../errors/auth_error.js');
const CreationError = require('../errors/creation_error.js');

const { NODE_ENV, JWT_SECRET } = process.env;

exports.createUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AuthError('Пароль или почта введены некорректно');
  }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash,
    }))
    .then((user) =>res.send({
      _id: user._id,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        next(new CreationError('Для этого email уже создан пльзователь'));
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ValidationError(err.message));
      } else {
        next(err);
      }
    });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`, { expiresIn: '7d' });
      res.send({ token, user });
    })
    .catch((err) => {
      throw new AuthError(err.message);
    })
    .catch(next);
};
