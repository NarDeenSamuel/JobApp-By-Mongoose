import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { addCompanyVal, deleteCompanyVal, getCompanyJobsVal, getJobsApplicationsVal, searchCompanyVal, updateCompanyVal } from "./company.validation.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { addCompany, deleteCompany, getCompanyJobs, getJobsApplications, searchCompany, updateCompany } from "./company.controller.js";
import { checkEmailAndName } from "../../middleware/checkCompanyName&email.js";


const companyRouter = Router()

companyRouter.post('/company',validate(addCompanyVal),checkEmailAndName,verifyToken,addCompany)
companyRouter.put('/company/:id',validate(updateCompanyVal),verifyToken,updateCompany)
companyRouter.delete('/company/:id',validate(deleteCompanyVal),verifyToken,deleteCompany)
companyRouter.get('/companyWithJobs/:id',validate(getCompanyJobsVal),verifyToken,getCompanyJobs)
companyRouter.get('/company',validate(searchCompanyVal),verifyToken,searchCompany)
companyRouter.get('/companyJobs/:id',validate(getJobsApplicationsVal),verifyToken,getJobsApplications)

export default companyRouter



// app.get('/job/applyJob',async(req,res)=>{

//     const applications = await applicationModel.find()
//      res.json({message:"Done",applications})
//  })
 