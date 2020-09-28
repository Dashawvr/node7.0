const uuid = require('uuid');
const fs = require('fs-extra').promises;


const { emailService, userService } = require('../services');
const { emailActionEnum: {WELCOME}, sequelize } = require('../configs');

module.exports = {
    create: async (req, res, next) => {
        const transaction = await sequelize.transaction();
        try {
            const {body: user, avatar} = req;

            const newUser = await userService.create(user, transaction)

            await emailService.sendMail(user.email, WELCOME, {userName: user.email})

            if (avatar) {
                const photoDir = `./users/${newUser.id}`;
                const fileExtension = avatar.name.split('.').pop();
                const photoName = `./${uuid}.${fileExtension}`;

                await fs.mkdir(path.resolve(process.cwd(), 'src', 'public', photoDir), {recursive: true})
                await fs.mv(path.resolve(process.cwd(), 'src', 'public', photoName));
                await userService.updateById(newUser.id, {avatar: `${photoDir}/${photoName}`}, transaction)
            }

            await transaction.commit();
            res.json({
                data: {
                    newUser
                }
            })
        } catch (e) {
            await transaction.rollback();
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
