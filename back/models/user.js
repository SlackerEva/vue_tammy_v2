const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  }
});

userSchema.statics.findUserByCredentials = function k(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return user;
    });
};


module.exports = mongoose.model('user', userSchema);