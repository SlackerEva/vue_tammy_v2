const mongoose = require('mongoose');
//const validator = require('validator');

const shadowSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  nameEn: {
    type: String,
  },
  imgPath: {
    type: String,
  },
  link: {
    type: String,
  },
  type: {
    type: String,
  },
});

module.exports = mongoose.model('shadow', shadowSchema);