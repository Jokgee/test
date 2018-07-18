/*
Structure:
	https://blog.risingstack.com/node-hero-node-js-project-structure-tutorial/
	https://github.com/focusaurus/express_code_structure
	https://hackernoon.com/your-node-js-authentication-tutorial-is-wrong-f1a3bf831a46

	https://scotch.io/tutorials/easy-node-authentication-setup-and-local
 */
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const sessionFileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users = [
	{id: '2f24vvg', email: 'test@test.com', password: 'password'}
]

var config = require('../config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');

// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
	{ usernameField: 'email' },
	(email, password, done) => {
		console.log('Inside local strategy callback')
		// here is where you make a call to the database
		// to find the user based on their username or email address
		// for now, we'll just pretend we found that it was users[0]
		const user = users[0]
		if(email === user.email && password === user.password) {
			console.log('Local strategy returned true')
			return done(null, user)
		}
	}
));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
	console.log('Inside serializeUser callback. User id is save to the session file store here')
	done(null, user.id);
});

config.session.store = new sessionFileStore();

app.use(session(config.session));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

var indexRouter = require('./main/routes');
var usersRouter = require('./user/routes')
app.use('/', indexRouter);
app.use('/user', usersRouter);

/* GET users listing. */
/*
app.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

// create the login get and post routes
app.get('/user/login', function(req, res) {
	console.log('Inside GET /login callback function');
	console.log(req.sessionID);
	res.send(`You got the login page!\n`)
});

app.post('/user/login', (req, res, next) => {
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
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
