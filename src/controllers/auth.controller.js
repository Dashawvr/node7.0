const {authService} = require('../services');
const {tokinazer} = require('../helpers');

module.exports = {
    login: async (req, res, next) => {
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
    },
    logout: async (req, res, next) => {
        const access_token = req.access_token;
        // const {id} = req.authUser;

        await authService.deleteByAccessToken(access_token);

        res.end()

    }
    // getAll: async (req, res, next) => {
    //     const users = await userService.getAll();
    //
    //     res.json({
    //         data: {
    //             users
    //         }
    //     })
    // }
}
