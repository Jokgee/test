'use strict';

var bcrypt = require('bcrypt');
require("app/user/user");

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Users', [{
			name: 'John Doe',
			email: 'demo@demo.com',
            password:
		}], {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	}
};
