const { userService } = require('../services');

module.exports = {
    create: async (req, res, next) => {
        try {
            const user = req.body;

            await userService.create(user)

            res.json({
                data: {
                    user
                }
            })
        } catch (e) {
            next(e);
        }

    },
    getAll: async (req, res, next) => {
        try {
            const users = await userService.getAll();

            res.json({
                data: {
                    users
                }
            })
        } catch (e) {
            next(e);
        }
    }
}
