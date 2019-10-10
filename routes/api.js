const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send({
    message: 'You have reached the api.'
  })
});

module.exports = router;