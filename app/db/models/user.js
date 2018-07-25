//https://sequelize.readthedocs.io/en/1.7.0/articles/express/

'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
    },
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};