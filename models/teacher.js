'use strict';
module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsToMany(models.Student, {
      through: 'TeachersStudents',
      as: 'Student',
      foreignKey: 'studentId'
    });
  };
  return Teacher;
};