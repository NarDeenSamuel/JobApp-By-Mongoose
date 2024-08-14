
import joi from 'joi'

 const signUpVal =joi.object({
    firstName:joi.string().min(3).max(20).required(),
    lastName:joi.string().min(3).max(20).required(),
    mobileNumber:joi.string().pattern(/^(010|011|012|015)[0-9]{8}$/).required(),
    email:joi.string().pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/).required(),
    password:joi.string().required(),
    recoveryEmail: joi.string().pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/).required(),
    DOB:joi.string().pattern(/(19[6-9][0-9]|200[0-9])\-(0[1-9]|11|12)\-(0[1-9]|[1-2][0-9]|30|31)/),
    userName:joi.string(),
    role:joi.string()
})
const signInVal =joi.object({
    mobileNumber:joi.string().pattern(/^(010|011|012|015)[0-9]{8}$/),
    email:joi.string().pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
    password:joi.string().required(),
    recoveryEmail: joi.string().pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
}).or('mobileNumber', 'email', 'recoveryEmail');

const updateUserVal =joi.object({
    firstName:joi.string().min(3).max(20),
    lastName:joi.string().min(3).max(20),
    mobileNumber:joi.string().pattern(/^(010|011|012|015)[0-9]{8}$/),
    email:joi.string().pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
    recoveryEmail: joi.string().pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
    DOB:joi.string().pattern(/(19[6-9][0-9]|200[0-9])\-(0[1-9]|11|12)\-(0[1-9]|[1-2][0-9]|30|31)/),
    userName:joi.string(),
    id:joi.string().hex().length(24).required()
}).or('mobileNumber', 'email', 'recoveryEmail','firstName','lastName','DOB');

const deleteUserVal = joi.object({
    id:joi.string().hex().length(24).required()
})
const getUserVal = joi.object({
    id:joi.string().hex().length(24).required()
})

const getAnotherUserDataVal = joi.object({
    id:joi.string().hex().length(24).required()
})

const updatePasswordVal = joi.object({
    id:joi.string().hex().length(24).required(),
    password:joi.string().required(),
    updatedPassword:joi.string().required()
})
const getSameRecoveryEmailVal = joi.object({
    recoveryEmail: joi.string().pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/).required()
})


const forgetPasswordVal = joi.object({
    email:joi.string().pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
})
const updateNewPasswordByOTPVal = joi.object({
    newPassword:joi.string().required(),
    otpCode:joi.string().pattern(/^[0-9]{6}$/).required(),
    email:joi.string().pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/).required(),
})



export {
    signUpVal,signInVal,updateUserVal,deleteUserVal,getUserVal,getAnotherUserDataVal,updatePasswordVal,getSameRecoveryEmailVal,forgetPasswordVal,updateNewPasswordByOTPVal
}