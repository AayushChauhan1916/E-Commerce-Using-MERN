const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const Product = require("../models/Product");
const router = express.Router();
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dxos05gmt', 
    api_key: '615112541333775', 
    api_secret: 'gxdIzO7ODh01bjIsbhCaTsp6Pdw' 
});

router.post("/remove", wrapAsync(async(req, res)=>{
    const product = await Product.findByIdAndDelete(req.body.id);
    console.log(req.body.filename)
    if(!product){
        res.json({
            success:false,
            message:"Product Does not exist in database"
        })
    }else{
        await cloudinary.uploader.destroy(req.body.filename);
        res.json({
            success:true,
            message:"successfully deleted"
        })
    }
}))


module.exports = router;


