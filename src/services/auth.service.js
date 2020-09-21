const {TokenModel, UserModel} = require('../models');

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
    },


    deleteByRefreshToken: (refresh_token) => {
        return TokenModel.destroy({
            where: {
                refresh_token
            }
        })
    },
}
