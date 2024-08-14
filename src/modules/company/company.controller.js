import applicationModel from "../../../db/models/application.model.js";
import companyModel from "../../../db/models/compny.model.js";
import JobModel from "../../../db/models/job.model.js";
import userModel from "../../../db/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";





//  ---- Add company ----- /
//1- check inputs in validation
//2- check that email and name don't be in database
//3- verify tokens to ensure that Company_HR that use it and online 
//4- if true add data 


const addCompany = catchError(async (req, res) => {
    let statusCase = await userModel.findOne({ _id: req.user.id })
    if (req.user.role == 'Company_HR' && statusCase.status == 'online') {
        let user = await userModel.findOne({ _id: req.body.companyHR })
        if (user && user.role == 'Company_HR') {
            let company = await companyModel.insertMany(req.body)
            res.status(201).json({ message: " Added ", company })
        }
        else {
            res.status(400).json({ message: "companyHR is not exist" })
        }
    }
    else {
        res.status(400).json({ message: " Can't do it " })
    }
})





//  ---- Update company data ----- /
//1- check inputs in validation
//2- verify tokens to ensure that that Company_HR that use it and online  
//3- ensure that user hwo updates data is the same user used the api from params
//4- if user update email or name are exist told him not allow
//5- then update any date user want to updated


const updateCompany = catchError(async (req, res) => {
    let company = await companyModel.findOne({ _id: req.params.id })
    if (company) {
        let statusCase = await userModel.findOne({ _id: req.user.id })
        if (req.user.id == company.companyHR  && statusCase.status == 'online') {
            let updatedcompany = await companyModel.findOne({
                $or: [
                    { companyEmail: req.body.companyEmail },
                    { companyName: req.body.companyName }
                ]
            })
            if (updatedcompany) {
                res.status(404).json({ message: "Can't use this Email or this Name" })
            }
            else {
                let updatedAll = await companyModel.findOneAndUpdate({ _id: req.params.id }, { companyName: req.body.companyName, description: req.body.description, industry: req.body.industry, address: req.body.address, numberOfEmployees: req.body.numberOfEmployees, companyEmail: req.body.companyEmail }, { new: true })
                res.status(200).json({ message: "Updated", updatedAll })
            }
        }
        else {
            res.status(400).json({ message: "you can't do it" })
        }

    }
    else {
        res.status(400).json({ message: "Company Not found" })
    }

})








//  ---- Delete company data ----- /
//1- check inputs in validation
//2- check if company is exist or not
//3- verify tokens to ensure that that Company_HR that use it and online  
//4- ensure that user hwo delete data is the same user used the api from params
//5- then delete user

const deleteCompany = catchError(async (req, res) => {
    let company = await companyModel.findOne({ _id: req.params.id })
    if (company) {
        let statusCase = await userModel.findOne({ _id: req.user.id })
        if (req.user.id == company.companyHR && statusCase.status == 'online') {
            let deletedCompany = await companyModel.findByIdAndDelete({_id:req.params.id})
           let jobs = await JobModel.find({addedBy:req.user.id})
            const jobIds = jobs.map(job => job.addedBy);
           let deletdjobs = await JobModel.deleteMany({addedBy:req.user.id})
            let applications = await applicationModel.find({ jobId: { $in: jobIds } })
             console.log(applications)
           
            //  let deletedApplications =  await applicationModel.deleteMany({ jobId: { $in: jobIds } });
           res.status(200).json({ message: 'Deleted', company,jobs,applications})
        }
        else {
            res.status(400).json({ message: "you can't do it" })
        }
    }
    else {
        res.status(400).json({ message: "company Not found" })
    }
})




//  ---- Get company data  ----- /
//1- check inputs in validation
//2- check if company is exist or not
//3- verify tokens to ensure that that Company_HR that use it and online  
//4- ensure that user hwo want data is the same user used the api from params
//5- get jobs that has addedBy = same id of companyHR


const getCompanyJobs =  catchError(async (req, res) => {
    let company = await companyModel.findOne({ _id: req.params.id })
    if (company) {
        let statusCase = await userModel.findOne({ _id: req.user.id })
        if (req.user.id == company.companyHR && statusCase.status == 'online') {
           let jobs = await JobModel.find({addedBy:req.user.id})
           res.status(200).json({message:"Done",company,jobs})
        }
        else {
            res.status(400).json({ message: "you can't do it" })
        }
    }
    else {
        res.status(400).json({ message: "company Not found" })
    }
})



//----- Search for a company with a name ---//
//1- check inputs in validation
//2- check if company is exist or not
//3- check status of user  
//4- get company

const searchCompany =  catchError(async (req, res) => {
    let company = await companyModel.findOne({ companyName: req.body.companyName })
    if (company) {
        let statusCase = await userModel.findOne({ _id: req.user.id })
        if ( statusCase.status == 'online') {
        
           res.status(200).json({ message: 'Done',company })
        }
        else {
            res.status(400).json({ message: "you can't do it" })
        }
    }
    else {
        res.status(400).json({ message: "company Not found" })
    }
})


// ------ Get all applications for specific Job -----/
//1- check inputs in validation
//2- check if job is exist or not
//3- check status of user  and the addedBy in job is the same id of user in params
//4- get applications that has jobId of this job and populate that to replace userId by it's real data


const getJobsApplications =  catchError(async (req, res) => {
    let job = await JobModel.findOne({ _id:req.params.id})
    if (job) {
        let statusCase = await userModel.findOne({ _id: req.user.id })
        if ( statusCase.status == 'online' && job.addedBy == statusCase.id) {
            const applications = await applicationModel.find({jobId:job.id}).populate({path: 'userId',select: 'userName mobileNumber email'})
           res.status(200).json({ message: 'Done', applications})
        }
        else {
            res.status(400).json({ message: "you can't do it" })
        }
    }
    else {
        res.status(400).json({ message: "Job Not found" })
    }
})


export {
    addCompany, updateCompany,deleteCompany,searchCompany,getCompanyJobs,getJobsApplications
}