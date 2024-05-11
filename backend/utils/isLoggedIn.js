module.exports = function (req, res, next) {
  if (req.user) {
    next(); // If user is logged in, pass control to the next middleware or route handler
  } else {
    res.status(401).json({ message: "Not logged in" }); // If user is not logged in, send a 401 Unauthorized response
  }
};
