const { User } = require('../connection/db')

const view = async (req, res) => {
    const { id } = req.user
    const data = await User.findOne({ where: { id } })
    if (!data) return res.status(404).send({ message: "user not found", success: false, data: { id } })
    return res.status(200).send({ message: "User found", success: true, data: data })
}
const update = async (req, res) => {
    try {
        const { id } = req.user
        console.log(id)
        const { first_name, last_name, email } = req.body
        const finduser = await User.findOne({ where: { id } })
        const data = req.body
        if (!finduser) return res.status(404).send({ message: "user id not found", success: false, data: id })
        await User.update({ first_name, last_name, email }, { where: { id } })
        return res.status(200).send({ message: "User Update successfully!!", success: true, data: { data } })
    } catch (error) {
        return res.status(400).send({ message: error.message, success: false, data: {} })
    }
}
const delete_user = async ( req, res) => {
    try{    
        const {id} = req.params
        const finduser = await User.findOne({where:{id}})
        if(!finduser) return res.status(404).send({message:"User Not Found", success: false, data:{id}})
        await User.destroy({where:{id}})
        return res.status(200).send({message:"User deleted successfully", success: true, data:{id}})

   }catch(error){
        return res.status(400).send({message:error.message, success:false, data:{}})
    }
}
module.exports = {
    view,
    update,
    delete_user,
}