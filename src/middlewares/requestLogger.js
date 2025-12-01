const logger = require('../config/logger');

const requestLogger = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;

        const body = { ...req.body };
        // Remove sensitive information
        if (body.password) body.password = '****';

        const logMessage = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms Body: ${JSON.stringify(body)} Message: ${res.statusMessage}`;

        console.log(logMessage);

        if (res.statusCode >= 400) {
            logger.error(logMessage);
        } else {
            logger.info(logMessage);
        }
    });

    next();
};

module.exports = requestLogger;