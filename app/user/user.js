const uuid = require('uuid/v4');
const Sequelize = require('sequelize');
const models = require('../db/models');

var user = {};

user.getUserByEmail = function(email) {
	return models.User.findOne({ where: {"email": email}});
};

user.getUserByID = function(id) {
	return models.User.findById(id);
};

module.exports = user;