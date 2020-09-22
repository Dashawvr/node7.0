const { emailService, userService } = require('../services');
const { WELCOME } = require('../configs/email-action.enam');

module.exports = {
    create: async (req, res, next) => {
        try {
            const user = req.body;

            await userService.create(user)

            await emailService.sendMail(user.email, WELCOME, {userName: user.email})

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
