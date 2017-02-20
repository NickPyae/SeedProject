var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var expressValidator = require('express-validator');
var mongoose = require('mongoose');
var config = require('./config/main');

var appRoutes = require('./routes/app');
var userRoutes = require('./routes/user');;

var app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.database);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// init passport
app.use(passport.initialize());

// bring in passport strategy we just defined
require('./config/passport')(passport);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// enable cross-origin resource sharing
app.use(cors());

app.use('/user', userRoutes);

app.use('/', appRoutes);

// catch 404 and forward to index page
app.use(function(req, res, next) {
  res.render('index');
});

module.exports = app;
