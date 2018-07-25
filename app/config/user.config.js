/*
How node modules work:
	1. Export what you want to include
	2. Require() that module/file
	3. Module/file is loaded and cached, making modules singletons (Kind of)
	4. Behind the scenes, modules are wrapped in an IIFE (I think)
	5. Any code outside of a function, but inside the module.exports, is called - so if you have a console.log, it's ran
	 	when node reaches that point in the code
	6. Since they're loaded as IIFEs (Again, I think), you don't have access to variables declared in the parent file,
		BUT singletons are a thing - so if you require a module that was already defined, in your module, you have access to that data.
 */

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userModel = require('../user/user');

module.exports = function (passport) {
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
      userModel.getUserByEmail(email).then(function(res){
      	const user = res.dataValues;
		  if (!user) {
			  return done(null, false, { message: 'Invalid credentials.\n' });
		  }
		  if (!bcrypt.compareSync(password, user.password)) {
			  return done(null, false, { message: 'Invalid credentials.\n' });
		  }
		  return done(null, user);
	  });
    }
  ));

  // tell passport how to serialize the user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
	userModel.getUserByID(id)
		.then(res => done(null, res.dataValues) )
		.catch(error => done(error, false));
  });
};
