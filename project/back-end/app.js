var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var indexRouter = require('./routes/index');

const loginRouter = require('./routes/login');
const signUpRouter = require('./routes/sign-up');
const findUserRouter = require('./routes/find-user');
const writePostRouter = require('./routes/write-post');
const friendProfileRouter = require('./routes/friend-profile');
const logOutRouter = require('./routes/logout');
const friendRequestRouter = require('./routes/friend-requests');
const sendRequestRouter = require('./routes/send-request');
const showFriendRouter = require('./routes/show-friends');
const acceptRequestRouter = require('./routes/accept-request');
const ignoreRequestRouter = require('./routes/ignore-request');
const showPostsRouter = require('./routes/show-posts')
const myProfileRouter = require('./routes/my-profile')
const chatRouter = require('./routes/chat')

var app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With',
  'Content-Type, Accept');
  next();
 });

app.use(cors());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/login', loginRouter);
app.use('/signup', signUpRouter);
app.use('/finduser', findUserRouter);
app.use('/writepost', writePostRouter);
app.use('/friendprofile', friendProfileRouter);
app.use('/logout', logOutRouter);
app.use('/friendrequests', friendRequestRouter);
app.use('/sendrequest', sendRequestRouter);
app.use('/showfriends', showFriendRouter);
app.use('/acceptrequest', acceptRequestRouter);
app.use('/ignorerequest', ignoreRequestRouter);
app.use('/showposts', showPostsRouter);
app.use('/myprofile', myProfileRouter);
app.use('/chat', chatRouter);


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
