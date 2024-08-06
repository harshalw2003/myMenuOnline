
const userModel = require('../Model/userModel.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const multer = require('multer');
const QRCode = require('qrcode');
const path = require('path');




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/home/harshalw19/Desktop/HW/menuMastermind//public/static/user-profiles');
  },
  filename: function (req, file, cb) {
    cb(null, `${new Date()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });


const uploadProfile = async (req, res, next) => {
  try {
      const user = await userModel.findById(req.user._id);
      user.profilePicture = req.file.path;
      await user.save();
      res.json({
        success :'true',
        message :'File uploaded successfully'});
      // console.log('File uploaded successfully')
    } catch (error) {
      console.log(error)
    }
}

const registerUser = async (req, res) => {

  console.log("User register API hit")

  try {

    const alreadyexist = await userModel.findOne({ email: req.body.email });

    if (!alreadyexist) {
      const plainPassword = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(plainPassword, salt);

      const userDetails = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedpassword

      }
      const newUser = new userModel(userDetails);
      console.log(newUser);
      // Generate QR code
      const qrCodePath = `/home/harshalw19/Desktop/HW/menuMastermind/public/static/qrcodes/${userDetails.name}-${Date.now()}.png`;
      QRCode.toFile(qrCodePath, userDetails.name, function (err) {
        if (err){
          return res.status(500).send('Error generating QR code');
          }
        newUser.qrCode = qrCodePath;

        const user = newUser.save()
        res.json({
          success: true,
          message: "User registered successfully",
          user: user
        })

      })
           

    }else {

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
  const userLoginDetails = req.body;
  console.log(userLoginDetails);
  try {
    const user = await userModel.findOne({ phone: userLoginDetails.phone });
    console.log(user)
    if (user) {
      const passwordHash = user.password;
      const loginPassword = userLoginDetails.password;
      console.log(passwordHash, loginPassword);

      const match = await bcrypt.compare(loginPassword, passwordHash);
      console.log(match);
      if (match) {
        //   const ExpiryTimeInSec = Math.floor(new Date() / 1000) + (60 *60) //after 1 Hour
        const userPayLoad = {
          phone: user.phone,
          email: user.email,
          _id: user._id
        }

        const token = jwt.sign(userPayLoad, process.env.JWT_SECRET_KEY)
        res.cookie('token', token, { httpOnly: true });
        console.log(token)
        console.log(user._id)
        await userModel.findByIdAndUpdate(user._id, { token: token })
        res.json({
          success: true,
          message: "User logged in successfully",
          jwtToken: token
        });
      } else {
        res.json({
          success: false,
          message: "Invalid password",
        });
      }
    } else {
      res.json({
        success: true,
        message: "User not found",

      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

const updateDetails = async (req, res) => {

  console.log("User update details API hit")
  const updatedDetails = req.body
  console.log(updatedDetails)
  const user = req.user
  console.log(user)
  await userModel.findByIdAndUpdate(user._id, updatedDetails)
  // update.save()
  res.json({
    success: true,
    message: "User details updated successfully",
    updatedDetails: updatedDetails
  })

}


const logoutUser = async (req, res) => {

  console.log("User logout API hit")
  res.clearCookie('token');
  if (req.user) {
    const user = await userModel.findByIdAndUpdate(req.user._id, { token: "" })
    res.json({
      success: true,
      message: "User logged out successfully"
    })
  } else {
    res.json({
      success: false,
      message: "User Already logged out",
    })
  }
}


const userAdmin = async (req, res) => {

  try {
    console.log("User admin API hit")
    console.log(req.user)
    res.json({
      success: true,
      message: `User with name ${req.user.name} is authenticated`,

    })
  } catch (err) {

    res.json({
      success: false,
      message: "Failed to access user admin page",
      error: err.message,
    })


  }
}


const adminDashboard = async (req, res) => {

  try {
    console.log("Admin dashboard API hit")
    console.log(req.user)
    res.json({
      success: true,
      message: `Welcome to admin dashboard, ${req.user.name}`,
      userDetails: req.user

    })
  } catch (err) {

    res.json({
      success: false,
      message: "Failed to access admin dashboard",
      error: err.message,
    })


  }


}

// Set up multer for file uploads



module.exports = {
  registerUser,
  loginUser,
  upload,
  uploadProfile,
  logoutUser,
  userAdmin,
  adminDashboard,
  updateDetails,

}