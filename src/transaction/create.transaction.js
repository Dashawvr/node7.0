const client = require('./index');

module.exports = () => {
    return client.transaction();
}
