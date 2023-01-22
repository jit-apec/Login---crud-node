const {Router}=require('express')
const {login, register, requestPassword, resetPassword} =require('../controller/auth')
const authRouter=Router()
authRouter.post('/login',login)
authRouter.post('/register',register)
authRouter.post('/requestPassword',requestPassword)
authRouter.post('/resetPassword',resetPassword)
module.exports =authRouter