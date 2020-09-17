const {userService} = require('../services');

module.exports = {
    create: async (req, res, next) => {
        const user = req.body;

        await userService.create(user)

        res.json({
            data: {
                user
            }
        })
    },
    getAll: async (req, res, next) => {
        const users = await userService.getAll();

        res.json({
            data: {
                users
            }
        })
    }
}
