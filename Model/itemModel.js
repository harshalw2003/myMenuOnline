const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema([{

    itemName: {
        type: String,
        required: true
    },
    userName:{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    itemPrice: {
        type: Number,
        required: true,
        // unique: true
    },
    itemtagsa: {
        type: Array,
        required: true
    },

    itemType: {
        type: String,
        default: "Veg",
        require: false,
    },

}])

const itemModel= mongoose.model('Item', itemSchema);

module.exports =  itemModel;