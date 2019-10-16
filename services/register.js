/* eslint-disable no-console */
const Sequelize = require('sequelize');
const models = require('../models');

const { Student, Teacher, TeachersStudents } = models;
const { Op } = Sequelize;

async function registerConnection(teacher, student, data) {
  TeachersStudents.findOrCreate({
    where: { [Op.and]: [{ teacherId: teacher }, { studentId: student }] },
    defaults: { teacherId: teacher, studentId: student },
  })
    .then(() => {
      console.log('connection created');
    })
    .catch((err) => {
      console.log('ERROR', err);
      data.error.push('error creating connection');
    });
}

async function getTeacher(email, data) {
  await Teacher.findOrCreate({
    where: { email },
    defaults: { email },
  })
    .then(([teacher]) => {
      data.teacher = teacher.id;
    })
    .catch((err) => {
      console.log('ERROR', err);
      data.invalidEmail.push(email);
    });
}

async function getStudent(email, data) {
  await Student.findOrCreate({
    where: { email },
    defaults: { email },
  })
    .then(([student]) => {
      data.students.push(student.id);
    })
    .catch((err) => {
      console.log('ERROR', err);
      data.invalidEmail.push(email);
    });
}

async function register(form, callback) {
  const data = {
    invalidEmail: [],
    teacher: '',
    students: [],
    error: [],
  };

  try {
    for(let email of form.students) {
      await getStudent(email, data);
    };
    await getTeacher(form.teacher, data);
    if (data.error.length === 0) {
      for(let student of data.students) {
        await registerConnection(data.teacher, student, data);
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
    // callback(data);
    if (data.invalidEmail.length > 0) {
      callback({ message: `These emails are invalid: ${data.invalidEmail.join(', ')}` });
    } else if (data.error.length > 0) {
      callback({ message: data.error.join(', ') });
    } else {
      callback('ok');
    }
  }
}

module.exports = register;
