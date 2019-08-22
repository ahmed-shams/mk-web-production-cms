const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { // get my profile 
  return res.send('hello user api route')
});

router.post('/', async (req, res, next) => { // sign up
  console.log("data from client: ", req.body);
  return 
});

router.post('/:id', (req, res) => { // get other user's info

});

router.post('/login', (req, res, next) => {

});

router.post('/logout', (req, res) => {

});

module.exports = router;

