const {TokenModel} = require('../models');

module.exports = {
    create: (token) => {
        return TokenModel.create(token);
    },
    deleteByAccessToken: (access_token) => {
        return TokenModel.destroy({
            where: {
                access_token
            }
        })
    }
    // getAll: ()=>{
    //     return UserModel.findAndCountAll();
    // }
}
