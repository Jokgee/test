/*
	https://github.com/i0natan/nodebestpractices

Tutorials:
	https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d

Structure:
	https://blog.risingstack.com/node-hero-node-js-project-structure-tutorial/
	https://github.com/focusaurus/express_code_structure
	https://hackernoon.com/your-node-js-authentication-tutorial-is-wrong-f1a3bf831a46

	https://scotch.io/tutorials/easy-node-authentication-setup-and-local

Sequelize:
	http://docs.sequelizejs.com/manual/tutorial/migrations.html
	https://github.com/sequelize/express-example
	http://docs.sequelizejs.com/variable/index.html#static-variable-DataTypes

Passport:
	http://www.passportjs.org/docs/basic-digest/ ("Verify Callback")

 */
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var flash = require('connect-flash');
const passport = require('passport');

var config = require('./config/main.config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.locals.layout = path.join('layouts/main');
app.set('view engine', 'hbs');

//https://stackoverflow.com/questions/31594949/where-to-put-passportjs-local-strategy-in-an-express-application
require('./config/user.config.js')(passport);
config.session.store = new SequelizeStore({
	db: config.db
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(config.session));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

config.session.store.sync();

app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./main/main.routes');
var usersRouter = require('./user/user.routes')
app.use('/', indexRouter);
app.use('/user', usersRouter);

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
