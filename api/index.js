import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouters from './routers/user.route.js'
dotenv.config()
const app = express()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to database")
}).catch((err)=>{
    console.log(err)
})


app.listen(3000,()=>{
    console.log("Server is running at 3000!!")
})

app.use('/api/user',userRouters);