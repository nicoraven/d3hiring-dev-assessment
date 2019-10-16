const services = require('../services/services');

const registerAll = (req, res) => {
  console.log(req.body);
  if (!req.body.teacher || !req.body.students) {
    res.status(400).send({ message: 'please provide emails for both teacher and student(s).' });
  } else {
    services.register(req.body, (data) => {
      if (typeof data === 'string') {
        res.sendStatus(204);
      } else {
        res.status(400).send(data);
      }
    });
  }
};

module.exports = {
  registerAll,
};
