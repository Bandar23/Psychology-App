const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Creator = require('../models/creators');


passport.serializeUser((user,done)=>{
    return done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    Creator.findById(id,('c_email c_type c_name'),(err,user)=>{
        return done(err,user);
    });
});

passport.use('local-login',new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
},(req,email,password,done)=>{
    Creator.findOne({c_email:email},(err,user)=>{
        if(err) return done(err,false);
        if(!user) return done(null,false,req.flash('error-login','This Email Not found'));
        if(!user.comparePassword(password)){
            return done(err,false,req.flash('error-login','Email or Password Incorrect ! '));
        }

        return done(null,user);
    });
}));
