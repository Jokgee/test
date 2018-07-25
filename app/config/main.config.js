const Sequelize = require('sequelize');

var config = {}
var env       = process.env.NODE_ENV || 'development';
var sequelizeConfig    = require(__dirname + '/../db/config.json')[env];


config.db = new Sequelize(sequelizeConfig.database, sequelizeConfig.username, sequelizeConfig.password, sequelizeConfig );
config.db.models = require("../db/models")

config.session = {
	secret: 'ASDfw3rfsdflmzdsfj98q32h98askmbnweaklqwi',
	resave: false,
	saveUninitialized: true
};

config.password = {
	saltRounds: 10
};

module.exports = config;