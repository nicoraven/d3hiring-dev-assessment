const Student = require('../models').Student;

const landingMessage = (req, res) => {
  console.log('landing page');
  res.status(200).send({
    message: 'You have reached the api.'
  })
};

const registerStudent = (req, res) => {
  console.log('registering student');
  console.log(req.body);
  // res.status(400).send("submitted");
  Student.create({
    email: req.body.email
  })
  .then(student => escape.status(204).send(student))
  .catch(error => res.status(400).send(error));
};

module.exports = {
  landingMessage,
  registerStudent
}