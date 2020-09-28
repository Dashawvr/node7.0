const {UserModel, TokenModel} = require('../models');

module.exports = {
    create: (user, transaction) => {
        return UserModel.create(user, transaction);
    },

    getAll: () => {
        return UserModel.findAndCountAll();
    },

    updateById: (id, updateObject, transaction) => {
        return UserModel.update(
            {updateObject},
            {
                where: {id},
                returning: true,
                transaction
            });
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
