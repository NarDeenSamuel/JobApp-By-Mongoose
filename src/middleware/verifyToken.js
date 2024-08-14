import jwt from "jsonwebtoken"


export const verifyToken = (req,res,next) =>{
    let token = req.headers.token
    jwt.verify(token,"secret",async (err,decoded)=>{
        if(err) return res.status(401).json({message:"token error",err})
        req.user=decoded
        next()
})
}