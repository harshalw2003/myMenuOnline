const express = require('express');
const router = express.Router();
const categoryController = require("../Controller/categoryController.js")
const authMiddleware = require("../Middlewares/auth.js")

router.post("/addCategory",authMiddleware.authenticateToken, categoryController.addCategory )
// router.post("/uploadCategoryPicture",authMiddleware.authenticateToken, categoryController.upload.single("categoryPicture"), categoryController.uploadCategoryPicture)
router.get("/viewCategory",authMiddleware.authenticateToken, categoryController.viewCategories )



module.exports = router