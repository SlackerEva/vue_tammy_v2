const Shadow = require('../models/shadow');

exports.getShadows = (req, res) => {
  Shadow.find().limit(20)
    .then((shadow) => { 
      res.send(shadow)
      console.log(shadow)
    })
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};