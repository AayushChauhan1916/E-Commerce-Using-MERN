const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const wrapAsync = require("../utils/wrapAsync");


router.get("/fetchorder",wrapAsync(async(req,res)=>{
    // console.log("aayush")
    const orders = await Order.find({})
    if(orders){
        res.status(200).json({
            success:true,
            orders : orders
        })
    }else{
        res.status(500).json({
            success:false,
            message:"Something Went Wrong."
        })
    }
}))

router.patch("/editstatus",wrapAsync(async(req,res)=>{
    const {orderId,newStatus} = req.body;
    const order = await Order.findByIdAndUpdate(orderId,{$set:{status:newStatus}},{new : true})
    if(order){
        const orders = await Order.find({});
        res.status(200).json({success : true,orders : orders})
    }else{
        res.status(500).json({success : false , message:"Something Went Wrong."})
    }  
}))

module.exports = router;
