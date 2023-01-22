const { DataTypes } = require('sequelize')


const userModel = (sequelize) => {
    const users = sequelize.define('users', {
        first_name: { type: DataTypes.STRING },
        last_name: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING, unique: true },
        password: { type: DataTypes.STRING },
    })
    return users
}

module.exports = userModel