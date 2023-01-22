const {Router} = require('express')
const {view, update, delete_user} = require('../controller/user')
const auth = require('../middleware/admin')

const userRouter = Router()
userRouter.get('/view',auth,view)
userRouter.post('/update',auth,update)
userRouter.delete('/delete/:id',auth,delete_user)
module.exports = userRouter