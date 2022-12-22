const Shadow = require('../models/shadow');

exports.getShadows = (req, res) => {
  const { str, from, to, mainF, typeF, userShadows } = req.query;
  const userShadowsArr = userShadows.split(',');
  const typeFArr = typeF.split(',');

  const dbQuery = (filter) => {
    Shadow.find(filter).skip(from).limit(to - from)
    .then((shadow) => { 
      res.send(shadow)
    })
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка' });
    });
  }

  if (mainF === 'random') {
    const leng = userShadowsArr.length;
    const random = Math.floor(Math.random() * leng);
    dbQuery({ _id : userShadowsArr[random] });
  } else if (mainF === 'unmarked') {
    dbQuery({
      _id : {$nin : userShadowsArr},
      type: {$in : typeFArr} 
    });
  } else if (mainF === 'marked') {
    dbQuery({ 
      _id : {$in : userShadowsArr}, 
      type: {$in : typeFArr} 
    });
  } else {
    // console.log("From, To: (" + from + ", " + to + ")");
    dbQuery({ 
      name: new RegExp(str, 'i'),
      type: {$in : typeFArr}  
    });
  }
};