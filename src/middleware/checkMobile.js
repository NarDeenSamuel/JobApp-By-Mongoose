import userModel from '../../db/models/user.model.js'



export const checkMobile = async(req,res,next)=>{


    let user = await userModel.findOne({mobileNumber:req.body.mobileNumber})
    
if(user)
    {
        res.status(409).json({message:"Mobile Number is already exist"})
    }
    else{
        next()
    }

}