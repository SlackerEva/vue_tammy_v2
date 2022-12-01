const express = require('express');
const { addUserShadow, getUserShadows } = require('../controllers/userShadow');

const userShadowRoutes = express.Router();

userShadowRoutes.get('/get-user-shadows', getUserShadows);
userShadowRoutes.post('/add-user-shadow', addUserShadow);

exports.userShadowRoutes = userShadowRoutes;
