const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log("api file route");
  return res.send('api file route')
});

router.post('/', async (req, res, next) => { // Sign up
  try {
    const newUser = await db.User.create({
      content: req.body.content,
      name: req.body.name,
      parentId: req.body.parentId,
      UserId: req.body.userId
    });
    console.log(newUser);
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    // TODO: error handler
    return next(e);
  }
});

module.exports = router;
