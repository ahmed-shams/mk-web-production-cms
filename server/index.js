const express = require('express');
const cors = require('cors'); 
const morgan = require('morgan');

// DB
const db = require('./models');

// Routes
const userAPIRouter = require('./routes/user');

// app
const app = express();
db.sequelize.sync();

app.use(morgan('dev'));
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json);
app.use(express.urlencoded({ extended: true }));

// Using Router
app.use('/api/user', userAPIRouter);

app.listen(3001, () => {
  console.log("The server is running on http://localhost:3001");
});


// TOOD:
// 1. route setup 
// 2. check if client can hit the server (login request)
// 3. implement login 
// 4. implement file upload - front + back
// 5. 