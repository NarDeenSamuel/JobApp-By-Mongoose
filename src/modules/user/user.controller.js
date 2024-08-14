import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../../../db/models/user.model.js';
import { catchError } from "../../middleware/catchError.js";
import { sendEmail } from '../../email/email.js';
import { generateOTP } from '../../email/OTP.js';


//  ---- Sign Up -----  /
//1-check inputs in validation
//2-check if mobile exist return 
//3-check if emeil exist return
//4-at finall signUp with data and make password undefind to make it un seen to any one

const signUp = catchError(async (req, res) => {
    let addUser = await userModel.insertMany(req.body);
    addUser[0].password = undefined
    res.status(201).json({ message: "Added", addUser })
})



//  ---- Sign In -----  /
//1-check inputs in validation
//2-check if emeil or mobile or recoveryEmail exist or not if not return
//3-make it logIn and OutPut the token

const signIn = catchError(async (req, res) => {
    let user = await userModel.findOne({
        $or: [
            { email: req.body.email },
            { mobileNumber: req.body.mobileNumber },
            { recoveryEmail: req.body.recoveryEmail }
        ]
    })
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let updated = await userModel.findOneAndUpdate({ email: user.email }, { status: 'online' }, { new: true })
        let token = jwt.sign({ id: user._id, role: user.role, DOB: user.DOB, userName: user.userName, recoveryEmail: user.recoveryEmail, firstName: user.firstName, lastName: user.lastName }, "secret")
        res.status(200).json({ message: "welcome", token })
    }
    else {
        res.status(404).json({ message: " Invalid email or phone or password " })
    }
})


//  ---- update account ----- /
//1- check inputs in validation
//2- verify tokens to ensure that real user that use it
//3- ensure that user hwo updates data is the same user used the api from params
//4- if user update email or mobile are exist told him not allow
//5- then update any date user want to updated

const updateUser = catchError(async (req, res) => {
    const foundUser = await userModel.findOne({ _id: req.params.id })
    if (foundUser) {
        if (req.user.id == req.params.id && foundUser.status == 'online') {
            let updateduser = await userModel.findOne({
                $or: [
                    { email: req.body.email },
                    { mobileNumber: req.body.mobileNumber }
                ]
            })
            if (updateduser) {
                res.status(404).json({ message: "Can't use this phone or this email" })
            }
            else {
                let updatedAll = await userModel.findOneAndUpdate({ _id: req.user.id }, { firstName: req.body.firstName, lastName: req.body.lastName, DOB: req.body.DOB, recoveryEmail: req.body.recoveryEmail, mobileNumber: req.body.mobileNumber, email: req.body.email }, { new: true })
                let userName = updatedAll.firstName + updatedAll.lastName
                updatedAll = await userModel.findByIdAndUpdate({ _id: req.user.id }, { userName: userName }, { new: true })
                res.status(200).json({ message: "Updated", updatedAll })
            }
        }
        else {
            res.status(400).json({ message: "You can't do it" })
        }
    }
    else {
        res.status(400).json({ message: "User not found" })
    }
})







//  ---- Delete account ----- /
//1- check inputs in validation
//2- verify tokens to ensure that real user that use it
//3- ensure that user hwo delete data is the same user used the api from params
//4- then delete user


const deleteUser = catchError(async (req, res) => {
    let statusCase = await userModel.findOne({ _id: req.params.id })
    if (req.user.id == req.params.id && statusCase.status == 'online') {
        let deletedUser = await userModel.findByIdAndDelete({ _id: req.user.id })
        res.status(200).json({ message: 'Delated', deletedUser })
    }
    else {
        res.status(400).json({ message: " Can't delete it" })

    }
})




//  ---- Get user account data  ----- /
//1- check inputs in validation
//2- verify tokens to ensure that real user that use it
//3- ensure that user hwo delete data is the same user used the api from params
//4- then get user

const getUserData = catchError(async (req, res) => {
    let statusCase = await userModel.findOne({ _id: req.params.id })
    if (req.user.id == req.params.id && statusCase.status == 'online') {
        let user = await userModel.findOne({ _id: req.user.id })
        user.password = undefined
        res.status(200).json({ message: 'Done', user })
    }
    else {
        res.status(400).json({ message: " Can't do it " })

    }
})



//  ---- Get profile data for another user  ----- /
//1- check inputs in validation
//2- verify tokens to ensure that Company_HR that use it and being online
//3- then show user data with password = undefind

const getAnotherUserData = catchError(async (req, res) => {
    let statusCase = await userModel.findOne({ _id: req.user.id })
    if (req.user.role == 'Company_HR' && statusCase.status == 'online') {
        let user = await userModel.findOne({ _id: req.params.id })
        user.password = undefined
        res.status(200).json({ message: 'Done', user })
    }
    else {
        res.status(400).json({ message: " Can't do it " })
    }
})




//  ---- Update password  ----- /
//1- check inputs in validation
//2- verify tokens to ensure that real user that use it
//3- ensure that user hwo update password is the same user that used the api from params
//4- compare old password with password he entered
//5- if correct change password if false make wrong password

const updatePassword = catchError(async (req, res) => {
    let statusCase = await userModel.findOne({ _id: req.params.id })
    if (req.user.id == req.params.id && statusCase.status == 'online') {
        let user = await userModel.findOne({ _id: req.user.id })
        if (bcrypt.compareSync(req.body.password, user.password)) {
            let newPassword = bcrypt.hashSync(req.body.updatedPassword, 8)
            await userModel.findOneAndUpdate({ _id: req.user.id }, { password: newPassword }, { new: true })
            res.status(200).json({ message: 'Done' })
        }
        else {
            res.status(400).json({ message: " Wrong Password " })
        }
    }
    else {
        res.status(400).json({ message: " Can't do it " })
    }
})






//  ---- Forget password (make sure of your data security specially the OTP and the newPassword )  ----- /
//1- check inputs in validation
//2- verify tokens to ensure that real user that use it
//3- ensure that user hwo forgetedPassword is the same user that used the api from params
//4- send gmail with otp code if he write email correct
//5- then the secound api user the same email & otp he recived with new password
//6- if all correct in validation inputs and used the same token and all data correct update old password with new password

const forgetPassword = catchError(async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (user) {
        const otp = generateOTP();
        sendEmail(user, otp)
        user = await userModel.findOneAndUpdate({ _id: user.id }, { otpCode: otp })
        res.status(200).json({ message: " Done " })
    }
    else {
        res.status(400).json({ message: " Email not found " })
    }
})


const updateNewPasswordByOTP = catchError(async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (user && user.otpCode == req.body.otpCode) {
        let newPassword = bcrypt.hashSync(req.body.newPassword, 8)
        await userModel.findOneAndUpdate({ email: req.body.email }, { password: newPassword, otpCode: '' }, { new: true })
        user.password = undefined
        user.otpCode = undefined
        res.status(200).json({ message: 'Done', user })
    }
    else {
        res.status(400).json({ message: " Email not found " })
    }
})


//  ---- Get all accounts associated to a specific recovery Email ----- /
//1- check inputs in validation
//2- verify tokens to ensure that Company_HR that use it and being online
//3- find user use the same recovery email 
//4- if found return users if not return not found

const getSameRecoveryEmail = catchError(async (req, res) => {
    let statusCase = await userModel.findOne({ _id: req.user.id })
    if (req.user.role == 'Company_HR' && statusCase.status == 'online') {
        let users = await userModel.find({ recoveryEmail: req.body.recoveryEmail })
        if (users.length != 0) {
            res.status(200).json({ message: 'Done', users })
        }
        else {
            res.status(200).json({ message: 'Not Found Users' })
        }

    }
    else {
        res.status(400).json({ message: " Can't do it " })
    }
})



export {
    signUp, signIn, updateUser, deleteUser, getUserData, getAnotherUserData, updatePassword, forgetPassword, getSameRecoveryEmail, updateNewPasswordByOTP
}
