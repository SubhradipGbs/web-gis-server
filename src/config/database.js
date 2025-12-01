const dbConfig = require('./config');
const { Sequelize } = require('sequelize');
const logger = require('./logger');

console.log(dbConfig);

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: (msg) => logger.info(msg),
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;