'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    suspended: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: '0',
    }
  }, {});
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