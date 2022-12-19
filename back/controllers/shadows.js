const Shadow = require('../models/shadow');

exports.getShadows = (req, res) => {
  const { str, from, to, mainF, typeF, userShadows } = req.query;
  const userShadowsArr = userShadows.split(',');
  const typeFArr = typeF.split(',');

  if (mainF === 'unmarked') {
    console.log("UnMarked here!");
    Shadow.find({
      _id : {$nin : userShadowsArr},
      type: {$in : typeFArr} 
    }).skip(from).limit(to - from)
      .then((shadow) => { 
        res.send(shadow)
      })
      .catch(() => {
        res.status(500).send({ message: 'Произошла ошибка' });
      });
  } else if (mainF === 'marked') {
    Shadow.find({ 
      _id : {$in : userShadowsArr}, 
      type: {$in : typeFArr} 
    }).skip(from).limit(to - from)
      .then((shadow) => { 
        res.send(shadow)
      })
      .catch(() => {
        res.status(500).send({ message: 'Произошла ошибка' });
      });
  } else {
    // console.log("From, To: (" + from + ", " + to + ")");
    Shadow.find({ 
      name: new RegExp(str, 'i'),
      type: {$in : typeFArr}  
    }).skip(from).limit(to - from)
      .then((shadow) => { 
        res.send(shadow)
      })
      .catch(() => {
        res.status(500).send({ message: 'Произошла ошибка' });
      });
  }
};