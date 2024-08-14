import mongoose from "mongoose"



const userSchema =  new mongoose.Schema({
    
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    userName: {
        type: String,
        
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    recoveryEmail: {
        type: String
    },
    DOB: {
        type: Date
    },
    mobileNumber: {
        type: String
    },
    role: {
        type: String,
        enum: ['User', 'Company_HR'],
        default: 'User'
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline'
    },
    otpCode:{
        type: String,
    }
},{versionKey:false})


const userModel =  mongoose.model('User',userSchema)

export default userModel


