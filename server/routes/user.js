const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const router = express.Router();

router.get('/', (req, res) => { // /api/user/
  if (!req.user) {
    return res.status(401).send('Requires login.');
  }
  const user = Object.assign({}, req.user.toJSON());
  delete user.password;
  return res.json(user);
});

router.post('/', async (req, res, next) => { // Sign up
  try {
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (exUser) {
      return res.status(403).send('ID already in use.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await db.User.create({
      nickname: req.body.nickname,
      userId: req.body.userId,
      email: req.body.email,
      password: hashedPassword,
    });
    console.log(newUser);
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    // TODO: error handler
    return next(e);
  }
});

router.post('/logout', (req, res) => { // /api/user/logout
  req.logout();
  req.session.destroy();
  res.send('Successufuly logged out');
});

router.post('/login', (req, res, next) => { // POST /api/user/login
  console.log("body in server: ", req.body);
  passport.authenticate('local', (err, user, info) => { // err : server error, user: user returned from passport, info: logic error in code
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      try {
        if (loginErr) {
          return next(loginErr);
        }
        const fullUser = await db.User.findOne({
          where: { id: user.id },
          include: [{
            model: db.File,
            as: 'Files',
            attributes: ['id'],
          }],
          attributes: ['id', 'email', 'userId', 'active'],
        });
        console.log(fullUser);
        return res.json(fullUser);
      } catch (e) {
        next(e);
      }
    });
  })(req, res, next);
});


router.get('/:id', (req, res) => { // other user's info /api/user/123

});;

module.exports = router;