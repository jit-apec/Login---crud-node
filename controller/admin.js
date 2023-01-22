const bcrypt = require('bcrypt')
const { Admin } = require('../connection/db')
const {AdminCreateValidation, AdminUpdateValidation} = require('../validation/validation')


const create = async (req, res) => {
    try {
        console.log(req.files);
        const validatedData = await AdminCreateValidation(req.body)
        const {first_name, last_name, email, phone, password} = validatedData
        const chkadmin = await Admin.findOne({where: { email }})
        if(chkadmin) return res.status(400).send({message: " email is already register", success: false, data: email})
        const encPassword =await bcrypt.hash(password,15)
        await Admin.create({ first_name, last_name, email, phone, password: encPassword })
        return res.status(200).send({message:"admin added successful",success: true})
    } catch (error) {
        return res.status(500).send({ message: error.message, status: false, data: {} })
    }
}
const update = async (req, res) => {
    try {
        const validatedData = await AdminUpdateValidation(req.body)
        const {id}= req.params
        const {first_name, last_name, email, phone} = validatedData
        const findadmin = await Admin.findOne({where:{id}})
        const data= req.body
        if(!findadmin) return res.status(404).send({message: "admin Id not found", success: false ,data: id})
         await Admin.update({ first_name, last_name, email, phone},{where:{id}})
        return res.status(200).send({message: "admin update successful",success:true, data:{data}})
    }catch(error){
        return res.status(500).send({message:error.message, success:false, data:{}})
    }
}
const delete_admin = async (req, res) => {
    try {
        const {id} = req.params
        const findadmin = await Admin.findOne({where:{id}})
        if(!findadmin) return res.status(404).send({message:"Admin Not Found", success:false, data:{id}})
        await Admin.destroy({where:{id}})
        return res.status(200).send({message:"admin deleted successfully", success: true, data:{id}})
    }catch(error)
    {
        return res.status(500).send({message:error.message, success:false, data:{}})
    }
}
const view = async (req, res) => {
    try {
        const {id} = req.params
        const data = await Admin.findOne({where:{id}})
         if(!data) return res.status(404).send({message:"admin not found", success:false, data:{id}})
         return res.status(200).send({message:"admin found", success:true, data:data})
    }catch(error) {
        return res.status(500).send({message:error.message, success:false, data:{}})
    }
}
const index = async (req, res) =>{
    try {
        const data = await Admin.findAll()
        if(!data) return res.status(404).send({message:"no data found", success:false})
        return res.status(200).send({message:"admin data " , success:true, data:data})
    } catch (error) {
        return res.status(500).send({message:error.message, success:false, data:{}})    
    }

}
module.exports ={
    create,
    update,
    delete_admin,
    view,
    index,
}
