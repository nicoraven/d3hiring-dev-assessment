const express = require('express');
const router = express.Router();
const controller = require('../controllers/mainController');

router.post('/register', controller.register.registerAll);
router.get('/', controller.landingMessage);

module.exports = router;