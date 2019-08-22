const express = require('express');
const cors = require('cors'); 
const morgan = require('morgan');

// DB
const db = require('./models');


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


app.get('/', (req, res) => {
  res.send("HOME MAIN PAGE");
});

app.get('/profile', (req, res) => {
  res.send('Profile');
});

app.listen(3001, () => {
  console.log("The server is running on http://localhost:3001");
});
