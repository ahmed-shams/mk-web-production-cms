const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log("api file route");
  return res.send('api file route')
});

module.exports = router;
