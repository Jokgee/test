var express = require('express');
var router = express.Router();
var passport = require('passport');
const bcrypt = require('bcrypt');
var config = require('../config/main.config');
var user = require('./user');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/login', function(req, res) {
	if (req.isAuthenticated())
		return res.redirect('/user/authrequired');
	res.render('login', {title: "Login", flashMessage: req.flash('message')});
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (info) {
			return res.send(info.message)
		}
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.redirect('/login');
		}
		req.login(user, (err) => {
			if (err) {
				return next(err);
			}
			return res.redirect('/user/authrequired');
		})
	})(req, res, next);
	/*passport.authenticate('local', { successRedirect: '/user/authrequired',
		failureRedirect: '/user/login',
		failureFlash: true })*/
})

router.get('/authrequired', user.isAuthenticated, (req, res) => {
	res.send('you hit the authentication endpoint\n');
})

module.exports = router;
