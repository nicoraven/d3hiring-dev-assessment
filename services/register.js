const models = require('../models');
const Student = models.Student;
const Teacher = models.Teacher;
const TeachersStudents = models.TeachersStudents;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

async function register(form, callback){

  let data = {
    invalidEmail: [],
    teacher: "",
    students: [],
    error: []
  };

  try {
    for(let email of form.students) {
      await getStudent(email, data);
    };
    await getTeacher(form.teacher, data);
    if(data.error.length === 0){
      for(let student of data.students) {
        await registerConnection(data.teacher, student);
      }
    }
  } catch(err){
    console.log(err);
  } finally {
    callback(data);
  }
}

async function registerConnection(teacher, student) {
  TeachersStudents.findOrCreate({
    where: { [Op.and]: [{teacherId: teacher}, {studentId: student}] },
    defaults: {teacherId: teacher, studentId: student}
  })
  .then(result => {
    console.log("connection created")
  })
  .catch(err => {
    console.log('ERROR', err)
    data.error.push("error creating connection")
  })
}

async function getTeacher(email, data) {
  await Teacher.findOrCreate({
    where: {email: email},
    defaults: { email: email}
  })
  .then(([user, created]) => {
    // console.log("found", user)
    data.teacher = user.id;
  })
  .catch(err => {
    console.log('ERROR', err)
    data.invalidEmail.push(email)
  })
}

async function getStudent(email, data) {
  await Student.findOrCreate({
    where: {email: email},
    defaults: { email: email}
  })
  .then(([user, created]) => {
    // console.log("found", user)
    data.students.push(user.id);
  })
  .catch(err => {
    console.log('ERROR', err)
    data.invalidEmail.push(email)
  })
}

module.exports = register;