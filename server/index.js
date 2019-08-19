const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send("HOME MAIN PAGE");
});

app.get('/profile', (req, res) => {
  res.send('Profile');
});

app.listen(3001, () => {
  console.log("The server is running on http://localhost:3001");
});
