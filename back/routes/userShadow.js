const express = require('express');
const { addUserShadow } = require('../controllers/userShadow');

const userShadowRoutes = express.Router();

userShadowRoutes.post('/add-user-shadow', addUserShadow);

exports.userShadowRoutes = userShadowRoutes;
