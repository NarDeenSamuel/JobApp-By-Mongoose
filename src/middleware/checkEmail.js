import userModel from '../../db/models/user.model.js'
import bcrypt from 'bcrypt'


export const checkEmail = async(req,res,next)=>{


    let user = await userModel.findOne({email:req.body.email})
    
if(user)
    {
        res.status(409).json({message:"email is already exist"})
    }
    else{
        req.body.userName= req.body.firstName+req.body.lastName
        req.body.password= bcrypt.hashSync(req.body.password,8)
        next()
    }

}
