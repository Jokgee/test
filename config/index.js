var uuid = require('uuid/v4');

var config = {}

config.test = {
	url: process.env.REDIS_STORE_URI,
	secret: process.env.REDIS_STORE_SECRET
};

config.session = {
	genid: (req) => {
		return uuid() // use UUIDs for session IDs
	},
	secret: 'ASDfw3rfsdflmzdsfj98q32h98askmbnweaklqwi',
	resave: false,
	saveUninitialized: true
};

module.exports = config;