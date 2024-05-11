const express = require("express");
const router = express.Router({mergeParams:true});
const User = require("../models/User");
const wrapAsync = require("../utils/wrapAsync");

router.post("/addtocart", async (req, res) => {
  try {
    const user = await User.findById(req.body.user);

    // Check if the product already exists in the cart
    const existingProductIndex = user.cart.findIndex(
      (item) => item.product.toString() === req.body.productId
    );

    if (existingProductIndex !== -1) {
      // If the product exists, increase its quantity by 1
      user.cart[existingProductIndex].quantity += req.body.quantity;
    } else {
      // If the product doesn't exist, add it to the cart
      user.cart.push({
        product: req.body.productId,
        quantity: req.body.quantity,
      });
    }

    // Save the user document
    await user.save();

    // Populate the cart with product details
    const userDetails = await User.findById(req.body.user).populate(
      "cart.product"
    );

    // Send response with updated cart
    res.status(200).json({
      success: true,
      cart: userDetails.cart,
    });
  } catch (error) {
    // Handle errors
    // console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.post(
  "/fetchcart",
  wrapAsync(async (req, res) => {
    let { userId } = req.body;
    // console.log(userId)
    const user = await User.findById(userId).populate("cart.product");
    if (!user) {
      res.status(401).json({
        success: false,
        message: "User does not exist unavailable to fetch cart",
      });
      return;
    } else {
      res.status(200).json({
        success: true,
        cart: user.cart,
      });
      return;
    }
  })
);

router.patch(
  "/deletefromcart",
  wrapAsync(async (req, res) => {
    const { userId, productId } = req.body;
    // console.log(req.body)
    const user = await User.findById(userId);
    // console.log(user)
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    const item = user.cart.find((item) => item.product == productId);
    if (!item) {
      return res
        .status(404)
        .json({ message: "Product not found in cart", success: false });
    }
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else if (item.quantity == 1) {
      user.cart = user.cart.filter((item) => item.product != productId);
    }
    await user.save();
    const finaluser = await User.findById(userId).populate("cart.product");
    res.status(200).json({
      message: "Cart item updated successfully",
      success: true,
      cart: finaluser.cart,
    });
  })
);

module.exports = router;
