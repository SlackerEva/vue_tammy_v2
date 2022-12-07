const express = require('express');
const { getShadows } = require('../controllers/shadows');

const shadowsRoutes = express.Router();

shadowsRoutes.get('/',getShadows);

exports.shadowsRoutes = shadowsRoutes;
