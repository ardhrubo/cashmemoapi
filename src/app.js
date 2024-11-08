import express from 'express'

const app = express()

// Public routes

app.get("/", (req, res) => { 
    res.json({
        message: "API is working perfectly"
    }); 

});


export { app }