const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {type : String, required : true},
    new_price  : {type : Number,required:true},
    old_price   : {type : Number,required:true},
    description  : {type : String, required : true},
    category : {type: String, required : true},
    stock : {type:Number, default:1},
    deleted : {type:Boolean, default:false},
    image : {
        filename:{type:String,required:true},
        imageUrl :{type:String,required:true}
    },
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

