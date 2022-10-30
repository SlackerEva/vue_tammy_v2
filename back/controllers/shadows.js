const Shadow = require('../models/shadow');

exports.getShadows = (req, res) => {
  let page = req.query.page
  //console.log(req.query.page);
  Shadow.find().skip(10*page).limit(10)
    .then((shadow) => { 
      res.send(shadow)
    })
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};