const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "User",
        required:true,
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "User",
        required:true,
    },
    itemPrice:{
        type:Number,
        default:0,
        required:true
    },
    taxPrice:{
        type:Number,
        default:0,
        required:true
    },
    shippingPrice:{
        type:Number,
        default:0,
        required:true
    },
    totalPrice:{
        type:Number,
        default:0,
        required:true
    },
    shippingInfo:{
        address:{
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
        country:{
            type:String,
            default:"India"
        },
        pincode:{
            type:Number,
            required:true
        },
        phoneNo:{
            type:Number,
            required:true
        }
    },
    orderItems:[
        {
            product:{
                type:mongoose.Schema.ObjectId,
                ref:"Product",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            image:{
                type:String,
                required:true
            },
        },
    ],
    paymentInfo:{
        id:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        },
    },
    paidAt:{
        type:Date,
        required:true
    },
    orderStatus:{
        type:String,
        default:"Processing",
        required:true
    },
    deliveredAt:{
        type:Date,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
})

module.exports = mongoose.model("Order",orderSchema);