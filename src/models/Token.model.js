const {Model, DataTypes} = require('sequelize');

const {sequelize} = require('../configs');


class TokenModel extends Model{}

TokenModel.init({
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    access_token:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.STRING
    }
},{
    sequelize,
    modelName:'token'
})

module.exports = TokenModel;
