const http = require('http');

const {sequelize} = require('./configs');
const app = require('./app');

const server = http.createServer(app);

sequelize.sync({alter: true})
    .then(() => server.listen(5001, () => console.log('Server listening on port 5001')))
    .catch(error => console.log(error));

process.on('unhandledRejection', () => process.exit(0));

