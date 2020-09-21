const { authService } = require('../services');
const { tokinazer } = require('../helpers');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {id: user_id} = req.user;

            const token = tokinazer();

            await authService.create({
                ...token,
                user_id
            })


            res.json({
                data: {
                    token
                }
            })
        } catch (e) {
            next(e);
        }

    },

    logout: async (req, res, next) => {
        try {
            const access_token = req.access_token;

            await authService.deleteByAccessToken(access_token);

            res.end();
        } catch (e) {
            next(e);
        }


    },

    refreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.refresh_token;
            const token = tokinazer();

            await authService.deleteByRefreshToken(refresh_token);

            await authService.create({
                ...token
            })

            res.json({
                data: {
                    token
                }
            })
        } catch (e) {
            next(e);
        }

    }
}
