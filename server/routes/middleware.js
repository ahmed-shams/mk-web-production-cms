exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("Please login")
  }
};

exports.isNotLoggedIn = (req, res, next) => { // TODO: sign up or login page should not be accessible by loggedin user
  if(!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("Can't access this page if you are loggedIn");
  }
};

