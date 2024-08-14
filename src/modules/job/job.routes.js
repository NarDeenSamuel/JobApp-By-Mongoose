import { Router } from "express";
import { addJobVal,  applayJobVal,  deleteJobVal, getJobsByCompanyNameVal, getJobsByFilterVal, updateJobVal } from "./job.validation.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { addJob,  applyJob,  deleteJob, getJobsAndCompanies, getJobsByCompanyName, getJobsByFilter, updateJob } from "./job.controller.js";
import { validate } from "../../middleware/validate.js";
import { fileUpload } from "../../fileUpload/fileUpload.js";



// apllayJobVal,    
const jobRouter = Router()

jobRouter.post('/job/:addedBy',validate(addJobVal),verifyToken,addJob)
jobRouter.put('/job/:id',validate(updateJobVal),verifyToken,updateJob)
jobRouter.delete('/job/:id',validate(deleteJobVal),verifyToken,deleteJob)
jobRouter.get('/job',verifyToken,getJobsAndCompanies)
jobRouter.get('/job/companyName',validate(getJobsByCompanyNameVal),verifyToken,getJobsByCompanyName)
jobRouter.get('/job/filter',validate(getJobsByFilterVal),verifyToken,getJobsByFilter)
jobRouter.post('/job/applyJob/:userId',validate(applayJobVal),fileUpload('userResume'),verifyToken,applyJob)

export default jobRouter

