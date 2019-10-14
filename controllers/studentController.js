const services = require('../services/services');

const commonStudents = (req, res) => {
  console.log(req.query.teacher)

  services.students.commonStudents(req.query.teacher, data => {
    // if(data.error.length > 0 || data.invalidEmail.length > 0){
    //   res.status(400).send(data);
    // } else {
    //   res.status(200).send(data)
    // }
    res.status(200).send(data)
  })
  // res.sendStatus(204);
};

module.exports = {
  commonStudents
}