const express = require('express');

const router = express.Router();
const controller = require('../controllers/mainController');

router.post('/register', controller.register.registerAll);
router.post('/suspend', controller.students.suspendStudent);
router.post('/retrievefornotifications', controller.students.notifications);
router.get('/commonstudents', controller.students.commonStudents);
router.get('/', controller.landingMessage);

module.exports = router;
