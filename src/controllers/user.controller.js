const uuid = require('uuid');
const fs = require('fs-extra').promises;

const { emailService, userService } = require('../services');
const { WELCOME } = require('../configs/email-action.enam');

module.exports = {
    create: async (req, res, next) => {
        try {
            const {body: user, avatar} = req;

            await userService.create(user)

            await emailService.sendMail(user.email, WELCOME, {userName: user.email})

            if (avatar) {
                const photoDir = `./users${user.id}/photos`;
                const fileExtension = avatar.name.split('.').pop();
                const photoName = `./${uuid}.${fileExtension}`;

                await fs.mkdir(path.resolve(process.cwd(), 'src', 'public', photoDir), {recursive: true})
                await fs.mv(path.resolve(process.cwd(), 'src', 'public', photoName));

                console.log('*****');
                console.log(user.id);
                console.log('*****');

                await userService.updateById(user.id, {avatar: `${photoDir}/${photoName}`})

            }

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
