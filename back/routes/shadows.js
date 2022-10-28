const express = require('express');
const router = express.Router();
const { getShadows } = require('../controllers/shadows');

router.get('/', getShadows);

module.exports = router;