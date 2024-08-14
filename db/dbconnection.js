import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config();



export const dbConnection = mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("DB connected")
}).catch((err)=>{
    console.log("DB error ",err)
})