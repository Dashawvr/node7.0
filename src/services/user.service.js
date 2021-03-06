const {UserModel, TokenModel} = require('../models');

module.exports = {
    create: (user) => {
        return UserModel.create(user);
    },

    getAll: () => {
        return UserModel.findAndCountAll();
    },

    getByEmail: (email) => {
        return UserModel.findOne({
            where: {
                email
            }
        })
    },

    getByAccessToken: (access_token) => {
        return UserModel.findOne({
            include: {
                model: TokenModel,
                where: {
                    access_token
                }
            }
        })
    },

    getByRefreshToken: (refresh_token) => {
        return UserModel.findOne({
            include: {
                model: TokenModel,
                where: {
                    refresh_token
                }
            }
        })
    },
}
