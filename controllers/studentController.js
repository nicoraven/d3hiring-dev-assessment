const services = require('../services/services');

const commonStudents = (req, res) => {
  console.log(req.query.teacher)

  services.students.commonStudents(req.query.teacher, data => {
    res.status(200).send(data)
  })
};

const suspendStudent = (req, res) => {
  console.log(req.body);

  services.students.suspendStudent(req.body.student, data => {
    if(data === 1){
      res.sendStatus(204);
    } else if (data === 0) {
      res.status(404).send("email does not exist");
    } else {
      res.send(400).send(data);
    }
  })
}

module.exports = {
  commonStudents,
  suspendStudent
}