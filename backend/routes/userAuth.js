const express = require("express");
const router = express.Router();
const User = require("../models/User");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    const { email, password, name } = req.body;
    const user = new User({
      username: email,
      email: email,
      name: name,
    });
    User.register(user, password, (err, user) => {
      if (err) {
        console.log(err);
        res.status(401).json({
          status: false,
          message: "A user with the given email already register",
        });
      } else {
        req.login(user, (err) => {
          if (err) {
            // console.error(err);
            return res
              .status(500)
              .json({ success: false, message: "Internal Server Error" });
          }
          // console.log("User successfully logged in");
          return res.status(200).json({
            success: true,
            message: "Successfully logged in",
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              address: user.address,
              orders: user.orders,
            },
          });
        });
      }
    });
  })
);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      // console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
    if (!user) {
      console.log(info);
      return res.status(401).json({ success: false, message: info.message });
    }
    req.login(user, (err) => {
      if (err) {
        // console.error(err);
        return res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }
      // console.log("User successfully logged in");
      return res.status(200).json({
        success: true,
        message: "Successfully logged in",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          address: user.address,
          orders: user.orders,
        },
      });
    });
  })(req, res, next); // Passing req, res, and next to the authenticate middleware
});

router.get("/logout", async (req, res) => {
  // console.log("aayush");
  req.logout((err) => {
    if (err) {
      res.json({
        success: false,
        message: err.message,
      });
    } else {
      res.json({
        success: true,
        message: "successfully logout",
      });
    }
  });
});

module.exports = router;
