const app=require('./app')
const port = 3000
require('./connection/db')
require('dotenv').config()

app.listen(port,()=>{
    console.log(`listen port ${port}`)
})
