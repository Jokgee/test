var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

// create the login get and post routes
router.get('/login', function(req, res) {
	console.log('Inside GET /login callback function');
	console.log(req.sessionID);
	res.send(`You got the login page!\n`)
});

router.post('/login', (req, res, next) => {
	console.log('Inside POST /login callback');
	passport.authenticate('local', (err, user, info) => {
		console.log('Inside passport.authenticate() callback');
		console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
		console.log(`req.user: ${JSON.stringify(req.user)}`);
		req.login(user, (err) => {
			console.log('Inside req.login() callback');
			console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
			console.log(`req.user: ${JSON.stringify(req.user)}`);
			return res.send('You were authenticated & logged in!\n');
		})
	})(req, res, next);
});

module.exports = router;
