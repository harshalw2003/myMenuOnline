const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
dotenv.config()
const port = process.env.PORT || 3000;


//importing Routes
const homeRoutes = require('./Routes/homeRoutes.js');
const userRoutes = require('./Routes/userRoutes.js');


//middlewares
app.use(express.json())
app.use(homeRoutes)
app.use('/user',userRoutes)


const connectDb = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connection  to DB Successfull")

    } catch (err) {

        console.log("Connection  to DB failed")

    }
}

//Connect to db
connectDb()


const serverUp = () => {

    console.log("Server is up and running at port " + port)
}

app.listen(process.env.PORT, serverUp)