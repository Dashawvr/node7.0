const jwt = require('jsonwebtoken');

module.exports= () => {
    const access_token = jwt.sign({}, 'HelloThere', {expiresIn: '20m'});
    const refresh_token = jwt.sign({}, 'another_secret_Token@', {expiresIn: '1d'});

    return {
        access_token,
        refresh_token
    }
}
