const mongoose = require('mongoose')

const userSchema = new mongoose.Schema([{

    name: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true,
        // unique: true,
    },
    email: {
        type: String,
        required: true,
        // unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: { 
        type: String,
        required: false,
        default : "public/static/assets/profile-png.png"
    },
    restaurantName: {
        type : String,
        required: false,
        default : "Your restaurant name here .."
    },
    restaurantAdress: {
        type : String,
        required: false,
        default : "Your restaurant address here .."
    },
    qrCode: {
        type: String,
        required: false
     },
    token : {
        type : String,
        required : false,
        default : ""
    },
    Subscription_isActive: {
        type: Boolean,
        default: false,
        require: true,
    },

}])

const userModel= mongoose.model('User', userSchema);

module.exports =  userModel;