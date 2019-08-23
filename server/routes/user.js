const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { // get my profile 
  return res.send('hello user api route')
});

router.post('/', async (req, res, next) => { // sign up
  console.log("hitting this route");
  console.log("data from client: ", req.body);
  return res.status(200).json(newUser);
});

router.post('/:id', (req, res) => { // get other user's info

});

router.post('/login', (req, res, next) => {
  console.log("data here in login: ", req.body);
});

router.post('/logout', (req, res) => {

});

module.exports = router;

