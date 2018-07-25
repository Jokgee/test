var express = require('express');
var router = express.Router();
var passport = require('passport');
const bcrypt = require('bcrypt');
var config = require('../config/main.config');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/login', function(req, res) {
	if (req.user)
		return res.redirect('/user/authrequired');
	res.render('login', {title: "Login", flashMessage: req.flash('message')});
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if(info) {return res.send(info.message)}
		if (err) { return next(err); }
		if (!user) { return res.redirect('/login'); }
		req.login(user, (err) => {
			if (err) { return next(err); }
			return res.redirect('/user/authrequired');
		})
	})(req, res, next);
})

router.get('/authrequired', (req, res) => {
	if(req.isAuthenticated()) {
		res.send('you hit the authentication endpoint\n');
	} else {
		req.flash("message", "Please login to access this page.")
		return res.redirect('/user/login');
	}
})

module.exports = router;
