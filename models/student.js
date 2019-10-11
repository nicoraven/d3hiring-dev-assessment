'use strict';

var validator = require('validator');

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: { isEmail: true },
      unique: true
    },
    suspended: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  Student.associate = function(models) {
    // associations can be defined here
    Student.belongsToMany(models.Teacher, {
      through: 'TeachersStudents',
      as: 'Teacher',
      foreignKey: 'teacherId'
    });
  };
  return Student;
};