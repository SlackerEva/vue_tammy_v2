const mongoose = require('mongoose');
//const validator = require('validator');

const userShadowSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  shadow: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'shadow',
    required: true,
  },
});

module.exports = mongoose.model('usershadow', userShadowSchema);