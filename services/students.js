const models = require('../models');
const Student = models.Student;
const sequelize = require('../models').sequelize;

const queryDb = async email =>{
  let results = await sequelize.query("select * from students inner join teachersstudents on students.id = teachersstudents.studentId where teachersstudents.teacherId = (select id from teachers where email = $email)", { bind: { email: email }, type: sequelize.QueryTypes.SELECT })
  return results;
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
      let nstudents = students.map(element => element.email);
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

const checkTaggedSuspended = async email => {
  let student = await Student.findOne({
    where: {
      email: email,
      suspended: false
    }
  })
  .then(student => {
    if(student){
      console.log("student", student.get({
        plain: true
      }));
      return student.get({
        plain: true
      }).email
    } else {
      return null;
    }
  })
  .catch(error => {
    console.log(error);
    return null;
  });
  return student;
}

const notifications = async (body, callback) => {
  let data = {
    "recipients":
      []   
  };

  let students = await queryDb(body.teacher, data);
  let filteredStudents = students.filter(student => student.suspended === 0);
  filteredStudents = filteredStudents.map(student => student.email);
  data.recipients.push(...filteredStudents);
  
  let tagged = body.notification.split(' ');
  tagged = tagged.filter(word => word.charAt(0) === '@');
  tagged = tagged.map(email => email.substring(1));
  let promises = tagged.map(async email => {
    let notSuspended = await checkTaggedSuspended(email);
    return notSuspended;
  });
  let notSuspendedTagged = await Promise.all(promises);
  notSuspendedTagged = notSuspendedTagged.filter(email => email !== null);
  data.recipients.push(...notSuspendedTagged);

  callback(data)
}

module.exports = {
  commonStudents,
  suspendStudent,
  notifications
}