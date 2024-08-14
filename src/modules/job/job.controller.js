import applicationModel from "../../../db/models/application.model.js";
import companyModel from "../../../db/models/compny.model.js";
import JobModel from "../../../db/models/job.model.js";
import userModel from "../../../db/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";






//  ---- Add Job ----- /
//1- check inputs in validation
//2- verify tokens to ensure that who added this job is the companyHR and his status is online
//3- if true add data 

const addJob = catchError(async(req,res)=>{
    let statusCase = await userModel.findOne({ _id: req.user.id })
    if (req.user.role == 'Company_HR' && statusCase.status == 'online') {
        let user = await userModel.findOne({ _id: req.body.addedBy})
        if (user && user.role == 'Company_HR' && user.id == req.body.addedBy) {
            let job = await JobModel.insertMany(req.body)
            res.status(201).json({ message: " Added ", job })
        }
        else {
            res.status(400).json({ message: "Not Company_HR" })
        }
    }
    else {
        res.status(400).json({ message: " Can't do it " })
    }
})


//  ---- Update Job ----- /
//1- check inputs in validation
//2- verify tokens to ensure that that Company_HR that use it and online  
//3- ensure that user hwo updates data is the same user used the api from params
//4- then update any date user want to updated

const updateJob = catchError(async(req,res)=>{
    let job = await JobModel.findOne({ _id: req.params.id })
    if (job) {
        let statusCase = await userModel.findOne({ _id: req.user.id })
        if (statusCase.id == job.addedBy && statusCase.status == 'online') {
            let updatedAll = await JobModel.findOneAndUpdate({ _id: req.params.id }, {jobTitle: req.body.jobTitle,jobLocation:req.body.jobLocation,workingTime: req.body.workingTime, seniorityLevel: req.body.seniorityLevel, jobDescription: req.body.jobDescription, technicalSkills: req.body.technicalSkills, softSkills: req.body.softSkills}, { new: true })
            res.status(200).json({ message: "Updated", updatedAll })
        }
        else {
            res.status(400).json({ message: "you can't do it" })
        }

    }
    else {
        res.status(400).json({ message: "Job Not found" })
    }

})





//  ---- delete Job ----- /
//1- check inputs in validation
//2- verify tokens to ensure that that Company_HR that use it and online  
//3- ensure that user hwo updates data is the same user used the api from params
//4- then delete job


const deleteJob = catchError(async (req, res) => {
    let job = await JobModel.findOne({ _id: req.params.id })
    if (job) {
        let statusCase = await userModel.findOne({ _id: req.user.id })
        if (statusCase.id == job.addedBy && statusCase.status == 'online') {
           let deletedJob = await JobModel.findByIdAndDelete({_id:req.params.id})
           let apps = await applicationModel.find({jobId:req.params.id})
            const appsIds = apps.map(app => app.jobId);
           let deletdapps = await applicationModel.deleteMany({jobId:req.params.id})
           res.status(200).json({ message: 'Delated' ,deletedJob,apps})
        }
        else {
            res.status(400).json({ message: "You Can't Do It" })
        }
    }
    else {
        res.status(400).json({ message: "Job Not Found" })
    }
})


// --- Get all Jobs with their company’s information. ---//
//1- check inputs in validation 
//3- ensure that user hwo want to see data is the same user used the api from params
//4- then it's mean that already user exist and can see jops by users that add it 

const getJobsAndCompanies = catchError(async(req,res)=>{
    const user = await userModel.findOne({_id:req.user.id})
    if(user.role == 'User'|| user.role == 'Company_HR')
    {
        const jobs = await JobModel.find().populate({path: 'addedBy',select: 'userName mobileNumber email'});
      const jobsWithCompanies = [];
      for (let job of jobs) {
        const companies = await companyModel.findOne({ companyHR: job.addedBy._id });
        jobsWithCompanies.push({job,companies});
      }
      res.status(200).json({message:"Done",jobsWithCompanies})  
    }
    else
    {
        res.status(400).json({ message: "Can't Do It" }) 
    }
    })




// --- Get all Jobs for a specific company. ---//
//1- check inputs in validation 
//3- ensure that user hwo want to see data is the same user used the api from params
//4- then it's mean that already user exist and can see company and it's jobs


const getJobsByCompanyName = catchError(async (req, res) => {

  const user = await userModel.findOne({_id:req.user.id})
  if(user)
  {
    const company = await companyModel.findOne({companyName:req.query.companyName})
    if(company)
    {
        const jobs = await JobModel.find({addedBy:company.companyHR})
        res.status(200).json({message:"Done",company,jobs})
    }
    else
    {
        res.status(400).json({ message: "Company Not Found" })
    }
  }
  else
  {
    res.status(400).json({ message: "User Not Found" })
  }

})



// --- Get all Jobs that match the following filters ---//
//1- check inputs in validation 
//3- ensure that user hwo want to see data is the same user used the api from params
//4- then it's mean that already user exist and can see jobs
//5- make filter object and check all data input and put into it all data that not equal undefind
//6- search by filter an get data


const getJobsByFilter = catchError(async (req, res) => {
    const {workingTime , jobLocation , seniorityLevel , jobTitle ,technicalSkills} = req.body

    let user = await userModel.findOne({_id:req.user.id})
    if(user)
    {
        const filter = {};
        if (workingTime != undefined) filter.workingTime = workingTime
        if (jobLocation != undefined) filter.jobLocation = jobLocation
        if (seniorityLevel != undefined) filter.seniorityLevel = seniorityLevel
        if (jobTitle != undefined) filter.jobTitle = jobTitle
        if (technicalSkills != undefined) filter.technicalSkills = technicalSkills
        let jobs = await JobModel.find(filter)
      
        res.status(200).json({message:"Done",jobs})
    }
    else
    {
        res.status(400).json({ message: "User Not Found" })
    }


  })
  
  



// --- Get all Jobs that match the following filters ---//
//1- check inputs in validation 
//2- upload file in localhost uploads after ensuring that is pdf file
//3- ensure that user hwo want to add application is the same user used the api from params
//4- then it's mean that user can add it's application 
//5- but all data from query to req.body to ensure that all data exist
//6- add application on database


const applyJob = catchError( async(req,res,next)=>{
            if(req.params.userId == req.user.id) 
            {
                req.body.userResume = req.file.filename
                req.body.userTechSkills = req.query.userTechSkills.split(',')
                req.body.userSoftSkills = req.query.userSoftSkills.split(',')
                req.body.jobId = req.query.jobId
                req.body.userId = req.user.id
               
               const application = await applicationModel.insertMany(req.body)
                res.status(201).json({message:"Done",application})
            }
            else
            {
                res.json({message:"can't add it"})
            }
            


})



export {
    addJob,updateJob,deleteJob,getJobsAndCompanies,getJobsByCompanyName,getJobsByFilter,applyJob
}
