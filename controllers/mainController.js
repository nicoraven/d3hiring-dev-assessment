const register = require('./registerController');
const students = require('./studentController');

const landingMessage = (req, res) => {
  res.status(200).send({
    message: 'You have reached the SAS api.'
  })
};

module.exports = {
  register,
  students,
  landingMessage
}