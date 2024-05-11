const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product: [
    {type:[Schema.Types.Mixed],_id:false}
  ],
  totalAmount : Number,
  totalItems : Number,
  paymentmethod : String,
  status : {type:String,default:"Pending"},
  shippingaddress : {type:[Schema.Types.Mixed],_id:false},
  orderDate : {type:Date,default:Date.now}
})

const Order = mongoose.model("Order",orderSchema)

module.exports = Order;
