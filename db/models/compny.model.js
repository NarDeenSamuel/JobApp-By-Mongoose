import mongoose from "mongoose"



const companySchema = new mongoose.Schema({
    companyName: {
        type: String
    },
    description: {
        type: String
    },
    industry: {
        type: String
    },
    address: {
        type: String
    },
    numberOfEmployees: {
        type: String
       
    },
    companyEmail: {
        type: String,
    },
    companyHR: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{versionKey:false});

const companyModel = mongoose.model('Company', companySchema);

export default companyModel