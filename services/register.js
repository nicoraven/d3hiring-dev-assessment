const Student = require('../models').Student;
const Teacher = require('../models').Teacher;

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
  } catch(err){
    console.log(err);
  } finally {
    // res.status(201).send(data)
    callback(data);
  }
}

async function getTeacher(email, data) {
  try {
    data.teacher = await findId('teacher', email);
  } catch(err) {
    console.log(err)
    data.invalidEmail.push(email);
  }
}

async function getStudent(email, data) {
  try {
    let studentId = await findId('student', email);
    data.students.push(studentId);
  } catch(err) {
    console.log(err)
    data.invalidEmail.push(email);
  }
}

function findId(type, email) {
  let model = type === 'teacher' ? Teacher : Student;
  return new Promise((resolve, reject) => {
    model.findOrCreate({
      where: {email: email},
      defaults: { email: email}
    })
    .then(([user, created]) => {
      // console.log("found", user)
      return resolve(user.id)
    })
    .catch(err => {
      console.log('ERROR', err)
      return reject(err);
    })
  })
}

module.exports = register;