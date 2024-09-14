const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/User");
const Product = require("../models/Product");
const Razorpay = require("razorpay");
const crypto = require("crypto");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

router.post(
  "/addorder",
  wrapAsync(async (req, res) => {
    let razorpayResponse;
    try {
      // console.log(req.body)
      if (req.body.paymentmethod == "card") {
        const razorpay = new Razorpay({
          key_id: process.env.KEY_ID,
          key_secret: process.env.KEY_SECRET,
        });

        // const options = req.body;
        razorpayResponse = await razorpay.orders.create({
          amount: req.body.totalAmount * 100,
          currency: "INR",
          receipt: req.body.user,
          payment_capture: 1,
        });
        if (!razorpayResponse) {
          res.status(500).send("error");
        }

        // console.log(order)
      }
      // Iterate through each product in the order
      for (const item of req.body.product) {
        // Extract product ID and quantity
        const { quantity } = item;
        const actualProduct = item.product;
        const { _id } = actualProduct;

        // Fetch the product from the database
        const foundProduct = await Product.findById(_id);

        if (!foundProduct) {
          return res.status(404).json({
            success: false,
            message: `Product with ID ${_id} not found.`,
          });
        }

        if (foundProduct.stock < quantity) {
          return res.status(500).json({
            success: false,
            message:
              "Product Quantity is greater than the stock availalbe, Sorry Can't place your order",
          });
        }

        // Update stock quantity
        foundProduct.stock -= quantity;

        // Save the updated product
        await foundProduct.save();
      }

      // Create and save the order
      const order = new Order(req.body);
      await order.save();

      // Associate the order with the user
      const user = await User.findById(req.body.user);
      user.orders.push(order);
      await user.save();

      // Clear user's cart
      await User.findByIdAndUpdate(req.body.user, { $set: { cart: [] } });

      // Respond with success
      res.status(200).json({
        success: true,
        message: "Order placed successfully.",
        order: [order],
        razorpayResponse: razorpayResponse,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  })
);

router.post("/fetch", async (req, res) => {
  const user = await User.findById(req.body.id).populate([
    "orders",
    "cart.product",
  ]);
  return res.status(200).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      orders: user.orders,
    },
  });
});

//
router.post(
  "/orderpayment/validate",
  wrapAsync(async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "vP83yht91wf42bY4zfEy4ItB")
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
    if (!isAuthentic) {
      res
        .status(400)
        .json({
          success: false,
          message:
            "Order did not placed amount will automatically refunded within 2-3 working days,Try Again ",
        });
    } else {
      for (const item of req.body.currentOrder.product) {
        // Extract product ID and quantity
        const { quantity } = item;
        const actualProduct = item.product;
        const { _id } = actualProduct;

        // Fetch the product from the database
        const foundProduct = await Product.findById(_id);

        if (!foundProduct) {
          return res.status(404).json({
            success: false,
            message: `Product with ID ${_id} not found.`,
          });
        }

        if (foundProduct.stock < quantity) {
          return res.status(500).json({
            success: false,
            message:
              "Product Quantity is greater than the stock availalbe, Sorry Can't place your order deducted amount refunded in 2-3 working days",
          });
        }

        // Update stock quantity
        foundProduct.stock -= quantity;

        // Save the updated product
        await foundProduct.save();
      }

      // Create and save the order
      const order = new Order(req.body.currentOrder);
      await order.save();

      // Associate the order with the user
      const user = await User.findById(req.body.currentOrder.user);
      // console.log(req.body.currentOrder.user)
      // console.log("user"+user)
      user.orders.push(order);
      await user.save();

      // Clear user's cart
      await User.findByIdAndUpdate(req.body.currentOrder.user, {
        $set: { cart: [] },
      });
      res.status(200).json({
        success: true,
        order_Id: razorpay_order_id,
        paymentId: razorpay_payment_id,
        order: [order],
      });
    }
  })
);

router.post(
  "/prepaidorder",
  wrapAsync(async (req, res) => {
    try {
      const { totalAmount, user } = req.body;

      // Check if totalAmount and user are provided in the request
      if (!totalAmount || !user) {
        return res.status(400).json({ success: false, message: "Invalid request data." });
      }

      const razorpay = new Razorpay({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET,
      });

      const razorpayResponse = await razorpay.orders.create({
        amount: totalAmount * 100, // Converting to paisa
        currency: "INR",
        receipt: user, // Ideally this should be a unique order identifier
        payment_capture: 1,
      });

      if (!razorpayResponse) {
        return res.status(500).json({ success: false, message: "Failed to create Razorpay order." });
      }

      res.status(200).json({
        success: true,
        razorpayResponse,
        currentOrder: req.body,
      });

    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
  })
);

module.exports = router;
