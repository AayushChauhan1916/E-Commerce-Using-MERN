const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/User");
const wrapAsync = require("../utils/wrapAsync");

router.post(
  "/addaddress",
  wrapAsync(async (req, res) => {
    const { userId, userAddress } = req.body;
    // console.log(1)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user doesn't exist",
      });
    } else {
      user.address.push(userAddress);
      await user.save();
      const userData = await User.findById(userId).populate([
        "address",
        "cart.product",
      ]);
      //    console.log(userData)
      res.status(200).json({
        success: true,
        message: "address save successfully",
        user: {
          _id: userData._id,
          name: userData.name,
          email: userData.email,
          address: userData.address,
          orders: userData.orders,
        },
      });
    }
  })
);

router.get("/fetch", wrapAsync(async (req, res) => {
  if (req.user) {
    const user = await User.findById(req.user._id).populate([
      "orders",
      "cart.product",
    ]);
    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
      },
    });
  } else {
    res.json({
      success: false,
      message: "user Not logged IN",
    });
  }
}));

module.exports = router;
