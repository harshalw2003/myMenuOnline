const path = require('path');


const viewAllCategories = async (req,res)=>{

    try{

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
    viewAllCategories,
    editCategory,
    deleteCategory,
}