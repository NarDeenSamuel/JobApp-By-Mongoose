

import joi from "joi";




const addJobVal = joi.object({
    jobTitle:joi.string().required(),
    jobLocation:joi.string().required(),
    workingTime:joi.string().required(),
    seniorityLevel:joi.string().required(),
    jobDescription:joi.string().required(),
    technicalSkills:joi.array().required(),
    softSkills:joi.array().required(),
    addedBy:joi.string().hex().length(24).required()
})



const updateJobVal =joi.object({
    jobTitle:joi.string(),
    jobLocation:joi.string(),
    workingTime:joi.string(),
    seniorityLevel:joi.string(),
    jobDescription:joi.string(),
    technicalSkills:joi.array(),
    softSkills:joi.array(),
    id:joi.string().hex().length(24).required()
}).or('jobTitle', 'jobLocation', 'workingTime','seniorityLevel','jobDescription','technicalSkills','softSkills');


const deleteJobVal =joi.object({
    id:joi.string().hex().length(24).required()
})

const getJobsByCompanyNameVal =joi.object({
    companyName:joi.string().required()
})


const getJobsByFilterVal = joi.object({
    jobTitle:joi.string(),
    jobLocation:joi.string(),
    workingTime:joi.string(),
    seniorityLevel:joi.string(),
    technicalSkills:joi.array()
}).or('jobTitle', 'jobLocation', 'workingTime','technicalSkills','softSkills');


const applayJobVal = joi.object({
    jobId:joi.string().hex().length(24).required(),
    userId:joi.string().hex().length(24).required(),
    userTechSkills:joi.required(),
    userSoftSkills:joi.required(),
    userResume:joi.string().pattern(/.*\.pdf$/),
})



export {
    addJobVal,updateJobVal,deleteJobVal,getJobsByCompanyNameVal,getJobsByFilterVal,applayJobVal
}
