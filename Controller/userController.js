
const userModel = require('../Model/userModel.js');
const bcrypt = require("bcrypt");


const registerUser = async (req, res) => {

    console.log("User register API hit")

    try {

        const alreadyexist = await userModel.findOne({ email: req.body.email });

        if (!alreadyexist) {
            const plainPassword = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hashedpassword = await bcrypt.hash(plainPassword, salt);

            const userDetails={
                name  :req.body.name,
                phone :req.body.phone,
                email :req.body.email,
                password: hashedpassword
                
            }
            const newUser = new userModel(userDetails);
            const user = newUser.save()
            res.json({
                success: true,
                message: "User registered successfully",
                user: user
            })

        } else {

            res.json({
                success: false,
                message: "User already exist with this email",
            })
        }


    } catch (error) {

        res.json({
            success: false,
            message: "User registration failed",
            error: error.message

        })

    }
}


const loginUser = async (req, res) => {

    const userLoginDetails = req.body
    try{
        const user = await userModel.findOne({phone: userLoginDetails.phone})
        console.log(user)
        if(user){
            const isMatch = await bcrypt.compare(userLoginDetails.password, user.password)
            console.log(isMatch)
            if(isMatch){

                res.json({
                    success: true,
                    message: "User logged in successfully",
                    user: user
                })
            }
            else{
                res.json({
                    success: false,
                    message: "Invalid Password"
                })
            }
        }
    }catch(err){
        res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}


module.exports = {
    registerUser,
    loginUser,

}