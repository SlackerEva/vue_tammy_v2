const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

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

exports.login = async (req, res, next) => {
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

exports.forgottenPass = async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne( {email} );
    
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });

    const link = `${process.env.BASE_URL_FRONT}/reset-password/?id=${oldUser._id}&token=${token}`;
    res.send({ oldUser, token});
    try {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });
    }
    catch (error) {
      console.log(error);
    }

    var mailOptions = {
      from: process.env.HOST_MAIL,
      to: oldUser.email,
      subject: "Password Reset",
      html:`<p>Нажмите ссылку для сброса пароля. Если вы не запрашивали сброс пароля, просто проинорируйте это сообщение</p>
      </br> <a>${link}</a>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {}
}

exports.resetPass = async (req, res) => { 
  const { password, id, token } = req.body;
  const oldUser = User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = process.env.JWT_SECRET + oldUser.password;
  try {
    //const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    //res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
}