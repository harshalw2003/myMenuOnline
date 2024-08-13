const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema([{

    categoryName: {
        type: String,
        required: true
    },
    categoryDescription: {
        type: String,
        required: false
    },
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categoryPicture :{

        type: String,
        required: false,
    }
}])

const CategoryModel= mongoose.model('Category', categorySchema);

module.exports =  CategoryModel;