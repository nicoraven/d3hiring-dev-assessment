const express = require('express');
const router = express.Router();
const controller = require('../controllers/mainController');

router.post('/register', controller.students.registerStudent);
router.get('/', controller.students.landingMessage);

module.exports = router;