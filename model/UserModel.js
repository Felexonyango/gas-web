const mongoose=require('mongoose')
var Schema = mongoose.Schema;
const userSchema =new Schema({

    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    phone:{
        type:String
    },
    amount:{
        type:Number
    },
    password:{
        type:String,
        required:true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    resetToken:String,
    expireToken:Date,
    date:{
        type:Date,
        default:Date.now
    }
    
})

module.exports=mongoose.model("Users", userSchema)
