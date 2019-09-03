const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
  console.log("api file route");
  return res.send('api file route')
});

router.post('/', async (req, res, next) => { // Sign up
  try {
    const newFile = await db.File.create({
      content: JSON.stringify(req.body.content),
      name: req.body.name,
      parentId: 0, //req.body.parentId,
      UserId: req.body.userId
    });
    console.log(newFile);
    return res.status(200).json(newFile);
  } catch (e) {
    console.error(e);
    // TODO: error handler
    return next(e);
  }
});

module.exports = router;
