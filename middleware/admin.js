
const JWT = require('jsonwebtoken')

const auth = async (req, res, next) => {
    const SECRET_KEY = process.env.SECRET_KEY
    try {
        const Token = req.headers.authorization
        const token = Token?.split(' ')
        if(!Token || !token[0] == "Bearer") return res.status(403).send({message:"Authorize Token is required", success: false, data:{}})
        // const token = req.headers['x-access-token']
        const decoded = JWT.verify(token[1], SECRET_KEY)
        if(!decoded) return res.status(403).send({message: "UnAuthorize Token", success: false, data:{}})
        req.user = decoded
        if(!req.user) return res.status(403).send({message: "Invalid token !", success: false, data:{}})
        next()
    } catch (error) {
        res.status(400).send({message: error.message, success: false, data:{}})
    }
}
module.exports= auth