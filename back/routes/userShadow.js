const express = require('express');
const { addUserShadow, getUserShadows, removeUserShadow } = require('../controllers/userShadow');

const userShadowRoutes = express.Router();

userShadowRoutes.get('/get-user-shadows', getUserShadows);
userShadowRoutes.post('/add-user-shadow', addUserShadow);
userShadowRoutes.delete('/remove-user-shadow', removeUserShadow);

exports.userShadowRoutes = userShadowRoutes;
