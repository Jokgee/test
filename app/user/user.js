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

//Taken from: https://stackoverflow.com/questions/47032593/how-to-use-passport-js-in-a-proper-way
user.isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		//if user is logged in, req.isAuthenticated() will return true
		return next();
	}
	res.redirect('/user/login');
};

module.exports = user;