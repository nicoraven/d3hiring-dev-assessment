const models = require('../models');
const Student = models.Student;
// const Teacher = models.Teacher;
// const TeachersStudents = models.TeachersStudents;
const sequelize = require('../models').sequelize;

const queryDb = async email =>{
  let results = await sequelize.query("select * from students inner join teachersstudents on students.id = teachersstudents.studentId where teachersstudents.teacherId = (select id from teachers where email = $email)", { bind: { email: email }, type: sequelize.QueryTypes.SELECT })
  return results;
}

const queryUnsuspendedStudents = async email =>{
  let results = await sequelize.query("select email from students inner join teachersstudents on students.id = teachersstudents.studentId where teachersstudents.teacherId = (select id from teachers where email = $email)", { bind: { email: email }, type: sequelize.QueryTypes.SELECT })
  let emails = results.map(students => students.email)
  return emails;
}

const count = names => 
  names.reduce((a, b) => ({ ...a,
    [b]: (a[b] || 0) + 1
  }), {})

const duplicates = (email, count) => 
  Object.keys(email).filter((a) => email[a] === count)

const filterDuplicates = (array, teachers) => {
  let newArray = count(array);
  newArray = duplicates(newArray, teachers);
  return newArray;
}

const commonStudents = async (teachers, callback) => {
  // teacher can be either an object of one email, or an array of emails
  if (typeof teachers === 'string'){
    teachers = [teachers]
  };

  let data = {
    "students": [],
    "error": []
  }

  for(let email of teachers) {
    try {
      let students = await queryDb(email, data);
      let nstudents = students.map(element => {
        return element.email
      });
      console.log(students)
      data.students.push(...nstudents);
    }
    catch {
      console.log("error");
    }
  };

  data.students = filterDuplicates(data.students, teachers.length);

  callback(data);
}

const suspendStudent = async (email, callback) => {
  Student.update(
    {suspended: true},
    {where: {email: email}}
  )
  .then(([result]) => {
    if(result === 1){
      callback(1);
    }
    else{
      callback(0);
    }
  })
  .catch(error => {
    console.log(error);
    callback(error);
  })
}

module.exports = {
  commonStudents,
  suspendStudent
}