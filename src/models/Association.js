const {UserModel, TokenModel}  = require('../models');


module.exports = ()=>{
    UserModel.hasMany(TokenModel,{foreignKey:'user_id'})
}
