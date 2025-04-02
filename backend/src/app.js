require("dotenv").config();

const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')

// route imports
const products = require("../src/routes/productRoute")
const users = require("../src/routes/userRoute")
const order = require('../src/routes/orderRoute')

const app = express();
const bodyparser = require('body-parser');
console.log(process.env.FRONTEND_URL)
app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
    credentials: true
}))

// to access req.body
app.use(bodyparser.json()); 
app.use(express.json());
app.use(cookieParser());

//available routes
app.use('/api/v1',products);
app.use('/api/v1',users);
app.use('/api/v1',order);

// middleware for errors
app.use(errorMiddleware)
module.exports = app