const Shadow = require('../models/shadow');

exports.getShadows = (req, res) => {
  const { str, from, to } = req.query;
  console.log("From, To: (" + from + ", " + to + ")");
  Shadow.find({
    name: new RegExp(str, 'i')
  }).skip(from).limit(to - from)
    .then((shadow) => { 
      res.send(shadow)
    })
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};