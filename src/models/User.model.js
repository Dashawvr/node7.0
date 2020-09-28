const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../configs');
const { hashPassword } = require('../helpers');


class UserModel extends Model {
}

UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(password) {
            this.setDataValue('password', hashPassword(password))
        }
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user'
})

module.exports = UserModel
