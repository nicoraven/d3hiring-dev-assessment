const services = require('../services/services');

const commonStudents = (req, res) => {
  console.log(req.query.teacher)

  services.students.commonStudents(req.query.teacher, data => {
    if(data.error.length > 0){
      res.status(400).send({message: data.error.join(", ")})
    } else {
      res.status(200).send({students: data.students})
    }
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
      res.status(400).send({message: data});
    }
  })
}

const notifications = (req, res) => {
  console.log(req.body);

  services.students.notifications(req.body, data => {
    res.status(200).send(data)
  })
}

module.exports = {
  commonStudents,
  suspendStudent,
  notifications
}