const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../configs');
const { hashPassword } = require('../helpers');


class UserModel extends Model {
}

UserModel.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
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
    }
}, {
    sequelize,
    modelName: 'user'
})

module.exports = UserModel
