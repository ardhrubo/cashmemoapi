import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// importing routes

import userRouter from './routes/user.route.js'
import invoiceRouter from './routes/invoice.route.js'
import shopRouter from './routes/shop.route.js'
import prouductRouter from './routes/product.route.js'
import stockRouter from './routes/stock.route.js'


// Public routes

app.get("/", (req, res) => { 
    res.json({
        message: "API is working perfectly"
    }); 

});



// routes declaration

app.use("/api/v1/users", userRouter)
app.use("/api/v1/cashmemo",invoiceRouter )
app.use("/api/v1/products",prouductRouter)
app.use("/api/v1/shop",shopRouter)
app.use("/api/v1/stock",stockRouter)


export { app };


