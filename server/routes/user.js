const express = require('express');
var bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../models');
const router = express.Router();
const { isLoggedIn } = require('./middleware');

router.get('/', isLoggedIn, (req, res) => { // /api/user/
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
    // console.log(newUser);
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
  res.status(200).send('Successufuly logged out');
});

router.post('/login', (req, res, next) => { // POST /api/user/login
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
            attributes: ['id', 'content'],
          }],
          attributes: ['id', 'email', 'userId', 'active'],
        });
        // console.log(fullUser);
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