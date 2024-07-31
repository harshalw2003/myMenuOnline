const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
dotenv.config()
const port = process.env.PORT || 5000;


//importing Routes
const homeRoutes = require('./Routes/homeRoutes.js');
const userRoutes = require('./Routes/userRoutes.js');


app.use(express.static(path.join(__dirname, 'public')));


//middlewares
app.use(express.json())
app.use(homeRoutes)
app.use('/user',userRoutes)


const connectDb = async () => {
    try {

        await mongoose.connect("mongodb://localhost:27017/menuMastermind")
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

app.listen(port, serverUp)