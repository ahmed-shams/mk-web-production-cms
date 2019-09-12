const express = require('express');
const morgan = require('morgan'); // log request in dev mode
const cors = require('cors');
// For login
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');
const passportConfig = require('./passport');

const dotenv = require('dotenv');
const db = require('./models');
const userAPIRouter = require('./routes/user');
const fileAPIRouter = require('./routes/file');
const serverless = require('serverless-http');

dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();

app.use(morgan('dev'));
// app.use(cors({  // origin and credentials settings are needed to exchange cookies between frontend and backend.. axios withcredentials setting is needed in frontend code
//   origin: true,
//   credentials: true,
// }));
app.use(function(req, res, next) { // ! this works
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
  resave: false, // force resave session everytime
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'rnbck', // to change the cookie name in the front end dev tool
//   store: redisStore - TODO: setup redis to prevent the session loss when server restart
}));
app.use(passport.initialize());
app.use(passport.session());

// API routes
app.use('/api/user', userAPIRouter);
app.use('/api/file', fileAPIRouter);

app.listen(3000, () => {
  console.log('server is running on http://localhost:3000');
});

module.exports.handler = serverless(app);

// TOOD:
// 1. route setup
// 2. check if client can hit the server (login request)
// 3. implement login
// 4. implement file upload - front + back
// 5.
