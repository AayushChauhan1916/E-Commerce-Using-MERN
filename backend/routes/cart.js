const express = require("express");
const router = express.Router({mergeParams:true});
const cartController = require("../controllers/cartController");

router.post("/addtocart", cartController.addToCart);

router.post(
  "/fetchcart",
  cartController.fetchCart
);

router.patch(
  "/deletefromcart",
  cartController.deleteFromCart
);

module.exports = router;
