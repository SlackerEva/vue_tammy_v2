const UserShadow = require('../models/userShadow');

exports.addUserShadow = async (req, res) => {
  const userId = req.user._id;
  const { shadowId } = req.body;

  UserShadow.create({
    user : userId,
    shadow : shadowId
  })
    .then((userShadow) => { 
      res.send(userShadow)
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};