import { Router } from "express";
import { deleteUser, forgetPassword, getAnotherUserData, getSameRecoveryEmail, getUserData, signIn, signUp, updateNewPasswordByOTP, updatePassword, updateUser } from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { validate } from "../../middleware/validate.js";
import { deleteUserVal, forgetPasswordVal, getAnotherUserDataVal, getSameRecoveryEmailVal, getUserVal, signInVal, signUpVal, updateNewPasswordByOTPVal, updatePasswordVal, updateUserVal } from "./user.validation.js";
import { checkMobile } from "../../middleware/checkMobile.js";
import { verifyToken } from "../../middleware/verifyToken.js";



const userRouter = Router()

userRouter.post('/signUp',validate(signUpVal),checkMobile,checkEmail,signUp)
userRouter.post('/signIn',validate(signInVal),signIn)
userRouter.put('/user/:id',validate(updateUserVal),verifyToken,updateUser)
userRouter.delete('/user/:id',validate(deleteUserVal),verifyToken,deleteUser)
userRouter.get('/user/:id',validate(getUserVal),verifyToken,getUserData)
userRouter.get('/userData/:id',validate(getAnotherUserDataVal),verifyToken,getAnotherUserData)
userRouter.patch('/user/updatePassword/:id',validate(updatePasswordVal),verifyToken,updatePassword)
userRouter.get('/users',validate(getSameRecoveryEmailVal),verifyToken,getSameRecoveryEmail)
userRouter.post('/user/forgetPassword',validate(forgetPasswordVal),forgetPassword)
userRouter.post('/user/updateNewPasswordByOTP',validate(updateNewPasswordByOTPVal),updateNewPasswordByOTP)

export default userRouter