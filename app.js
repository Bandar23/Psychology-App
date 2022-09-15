var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressValidator = require('express-validator');
const expressSession   = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const flash = require('connect-flash');
const passport = require('passport');
const aos = require('aos');
const bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var indexRouter = require('./routes/index');
var pagesRouter = require('./routes/pages');
const mongoose  = require('mongoose');
const { session } = require('passport');

var app = express();

app.use(favicon(__dirname + '/public/favicon.ico'));




mongoose.connect(
  process.env.MONGODB_URI ||'mongodb://localhost:/Psychology_App',
  { 
    useNewUrlParser:true
  },(err)=>{

  if(err){
    console.log(err)
  }else{
    console.log('DB Conected ..');

  }

});

require('./config/passport');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(expressSession({
  secret:'Psychology@App',
  saveUninitialized:false,
  cookie:1000 * 60 * 60 * 24,
  resave:true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 1 * 24 * 60 * 60, 
}),
  cookie: {
    secure: false,  
    httpOnly: false, 
    expires: new Date(Date.now() + 60 * 60 * 1000) 
  }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/',indexRouter);
app.use('/pages',pagesRouter);


app.use(function(req, res, next) {
  next(createError(404));
});
 
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
