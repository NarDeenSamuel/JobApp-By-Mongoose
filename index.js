process.on('uncaughtException',()=>{
    console.log('error in code')
})
import express from 'express'
import { dbConnection } from './db/dbconnection.js'
import userRouter from './src/modules/user/user.routes.js'
import { appError } from './src/utils/appError.js'
import { globalError } from './src/middleware/globalError.js'
import companyRouter from './src/modules/company/company.routes.js'
import jobRouter from './src/modules/job/job.routes.js'
import dotenv from 'dotenv'
dotenv.config();
const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(userRouter)
app.use(companyRouter)
app.use(jobRouter)
app.use('/uploads',express.static('uploads'))



app.use('*',(req,res,next)=>{
    next(new appError(`route not found ${req.originalUrl}`,404))
})
app.use(globalError)

process.on('unhandledRejection',()=>{
    console.log("Error")
})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))