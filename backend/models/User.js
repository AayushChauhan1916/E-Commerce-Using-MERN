const mongoose = require('mongoose');
const {Schema} = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');
// const Product = require("./Product");

const userSchema = new Schema({
    email:{type: String, required: true},
    name: String,
    address:[
        {
            _id:false,
            name:{
                type:String,
                required:true
            },
            email : {
                type:String,
                required:true
            },
            street:{
                type:String,
                required:true
            },
            city:{
                type:String,
                required:true
            },
            state:{
                type:String,
                required:true
            },
            pincode:{
                type:Number,
                required:true
            },
        }
    ],
    orders : [
        {
            type: Schema.Types.ObjectId,
            ref : 'Order'
        }
    ],
    cart : [
        {
            product : {
                type: Schema.Types.ObjectId, ref : 'Product'
            },
            quantity: {
                type: Number
            },
            _id:false
        }
    ]
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;

