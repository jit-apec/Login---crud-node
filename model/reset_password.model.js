const { DataTypes } = require('sequelize')

const ResetPasswordModel = (sequelize) => {
    const ResetPassword = sequelize.define('reset_password',{
        email: {type: DataTypes.STRING},
        token: {type: DataTypes.STRING},
    })
    return ResetPassword
}
module.exports = ResetPasswordModel