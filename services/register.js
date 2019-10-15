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
        await registerConnection(data.teacher, student, data);
      }
    }
  } catch(err){
    console.log(err);
  } finally {
    // callback(data);
    if(data.invalidEmail.length > 0){
      callback({message: `These emails are invalid: ${data.invalidEmail.join(", ")}`})
    }
    else if(data.error.length > 0){
      callback({message: data.error.join(", ")})
    }
    else {
      callback("ok");
    }
  }
}

async function registerConnection(teacher, student, data) {
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
  .then(([teacher, created]) => {
    // console.log("found", teacher)
    data.teacher = teacher.id;
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
  .then(([student, created]) => {
    // console.log("found", student)
    data.students.push(student.id);
  })
  .catch(err => {
    console.log('ERROR', err)
    data.invalidEmail.push(email)
  })
}

module.exports = register;