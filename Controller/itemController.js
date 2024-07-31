const path = require('path');

const viewAllitems = async (req,res)=>{

    try{
        res.json({
            success : true,
            message : "All Items fetched successfully",
            items : items
        })

    }catch(err){

        res.json({
            success : false,
            message : "Failed to fetch all items",
            error : err.message
        })
    }

}

const editItem = async (req,res)=>{

    try{

        res.json({
            success : true,
            message : "Item updated successfully",
            item : updatedItem
        })
    }catch(err){

        res.json({
            success : false,
            message : "Failed to update item",
            error : err.message
        })
    }
}

const delItem = async (req,res)=>{

    try{

        res.json({
            success : true,
            message : "Item deleted successfully",
            item : deletedItem
        })
    }catch(err){

        res.json({
            success : false,
            message : "Failed to delete item",
            error : err.message
        })
    }
}

module.exports= { viewAllItems,
    editItem,
    delItem,
}