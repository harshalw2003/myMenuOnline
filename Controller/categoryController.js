const path = require('path');
const categoryModel = require('../Model/categoryModel.js');
const userModel = require('../Model/userModel.js');
const multer = require('multer');


// Set up multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/static/category-pictures');
//   },
//   filename: async function (req, file, cb) {
//     // const category = await categoryModel.findOne({user: req.user._id});
//     const category = await  categoryModel.findOne({ categoryName: category.categoryName},{user : req.user._id})

//     console.log(category)
//     cb(null, `${Date.now()}${req.user.name}-${category.categoryName}-categoryPicture${path.extname(file.originalname)}`);
//   }
// });


// const upload = multer({ storage: storage });


const viewCategories = async (req,res)=>{

    try{

        const categories = await categoryModel.find({user : req.user._id})
        console.log(categories)

        res.json({
            success : true,
            message : "All Categories fetched successfully",
            categories : categories
        })
    }catch(err){
        res.json({
            success : false,
            message : "Failed to fetch all categories",
            error : err.message
        })
    }


}

const addCategory = async (req,res)=>{
    try{

        console.log(req.user)
        
        const category= {
            categoryName : req.body.categoryName,
            categoryDescription : req.body.categoryDescription,
            user : req.user._id
        }
        const ifCategoryExist = await  categoryModel.findOne({categoryName: category.categoryName,user : req.user._id})
        console.log(ifCategoryExist)
        console.log(category)
        if(ifCategoryExist){
            res.json({success: false, message: "Category already exists"})
        }else{

            const newCategory = new categoryModel(category)
            await newCategory.save()
            res.json({
                success : true,
                message : "Category added successfully",
                category : category
            })

        }
        
    }catch(err){
        console.log(err)

        res.json({
            success : false,
            message : "Failed to add category",
            error : err.message
        })
    }


}

const uploadCategoryPicture = async (req,res)=>{

    try { 
      
        const category = await  categoryModel.findOne({ categoryName: category.categoryName},{user : req.user._id})
        category.categoryPicture = req.file.path;
        await category.save();
        res.json({
          sucess : true,
          message : 'Category picture uploaded successfully'});
      } catch (error) {
        res.status(400).json(
          {
            sucess : false,
            message : 'Error uploading Category picture',
            error : error.message}
        );
      }


}


const editCategory = async (req,res)=>{

    try{

        re.json({

            success : true,
            message : "Category updated successfully",
            category : updatedCategory
        })
    }catch(err){

        res.json({
            success : false,
            message : "Failed to update category",
            error : err.message
        })

    }
}

const deleteCategory = async (req,res)=>{

    try{

        res.json({
            success : true,
            message : "Category deleted successfully",
            category : deletedCategory
        })
    }catch(err){

        res.json({
            success : false,
            message : "Failed to delete category",
            error : err.message
        })
    }
}

module.exports ={
    viewCategories,
    addCategory,
    uploadCategoryPicture,
    editCategory,
    deleteCategory,
    // upload,
}