const Sequelize = require('sequelize');
const AdminModel = require('../model/admin.model');
const userModel = require('../model/user.model');
const ResetPassword = require('../model/reset_password.model')
const sequelize = new Sequelize('learn_node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})
sequelize.authenticate().then(() => {
    console.log(`DB Connected`);
}).catch((error) => {
    console.log(`Error ${error}`);
})


var db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: userModel(sequelize),
    Admin: AdminModel(sequelize),
    ResetPassword: ResetPassword(sequelize),

}

sequelize.sync()

module.exports = db