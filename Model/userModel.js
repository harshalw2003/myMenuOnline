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

    Subscription_isActive: {
        type: Boolean,
        default: false,
        require: true,
    },

}])

const userModel= mongoose.model('User', userSchema);

module.exports =  userModel;