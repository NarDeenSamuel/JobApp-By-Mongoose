import companyModel from "../../db/models/compny.model.js"


export const checkEmailAndName = async (req,res,next)=>{

    const name = await companyModel.findOne({companyName:req.body.companyName})
    const email = await companyModel.findOne({email:req.body.companyEmail})
    if(name || email)
    {
        res.status(409).json({message:"Can't use this Email or this Name"})
    }
    else{
        next()
    }

}
