const Student = require('../models').Student;

const landingMessage = (req, res) => {
  res.status(200).send({
    message: 'You have reached the SAS api.'
  })
};

const registerStudent = (req, res) => {
  console.log(req.body);
  let data = [];
  req.body.students.forEach(student => {
    data.push({email: student})
  });
  Student.bulkCreate(data, {
    ignoreDuplicates: true 
  })
  .then(() => res.status(204).send())
  .catch(error => res.status(400).send(error));
};

module.exports = {
  landingMessage,
  registerStudent
}