import joi from 'joi'

const addCompanyVal =joi.object({
    companyName:joi.string().min(3).max(20).required(),
    description:joi.string().max(150).required(),
    industry:joi.string().required(),
    address:joi.string().required(),
    numberOfEmployees:joi.number().min(11).max(20).required(),
    companyEmail: joi.string().pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/).required(),
    companyHR:joi.string().hex().length(24).required()
})
const updateCompanyVal =joi.object({
    companyName:joi.string().min(3).max(20),
    description:joi.string().max(150),
    industry:joi.string(),
    address:joi.string(),
    numberOfEmployees:joi.number().min(11).max(20),
    companyEmail: joi.string().pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
    companyHR:joi.string().hex().length(24),
    id:joi.string().hex().length(24).required()
}).or('companyName', 'description', 'industry','address','numberOfEmployees','companyEmail','companyHR');

const deleteCompanyVal =joi.object({
    id:joi.string().hex().length(24).required()
})



const getCompanyJobsVal = joi.object({
    id:joi.string().hex().length(24).required()

})

const searchCompanyVal =joi.object({
    companyName:joi.string().min(3).max(20).required()
})


const getJobsApplicationsVal =joi.object({
    id:joi.string().hex().length(24).required()
})



export {
    addCompanyVal,updateCompanyVal,deleteCompanyVal,searchCompanyVal,getCompanyJobsVal,getJobsApplicationsVal
}
