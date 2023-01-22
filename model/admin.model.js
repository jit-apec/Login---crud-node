const { DataTypes } = require('sequelize');

const AdminModel=(sequelize) => {
    const admin = sequelize.define('admin',{
        first_name: {type: DataTypes.STRING},
        last_name: {type: DataTypes.STRING},
        email: {type: DataTypes.STRING, unique: true},
        phone: { type: DataTypes.STRING, unique: true},
        status: { type: DataTypes.BOOLEAN, defaultValue: "1"},
        password: { type: DataTypes.STRING},
    }) 
    return admin
}
module.exports = AdminModel