const express = require('express');
const app = express();
const cors = require('cors')
const authRouter = require('./routes/auth');
const AdminRouter = require('./routes/admin');
const UserRouter = require('./routes/user');
app.use(express.json())
app.use(cors({origin:'*'}))
app.use(express.static('./uploads'))
app.use('/auth', authRouter)
app.use('/admin',AdminRouter)
app.use('/user',UserRouter)
module.exports = app