const winston = require('winston');

require('winston-daily-rotate-file');

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
);

const successTransport = new winston.transports.DailyRotateFile({
    filename: 'logs/success-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    level: 'info',
    maxSize: '20m',
    maxFiles: '14d',
});

const errorTransport = new winston.transports.DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    level: 'error',
    maxSize: '20m',
    maxFiles: '14d',
});

const logger = winston.createLogger({
    format: logFormat,
    transports: [
        successTransport,
        errorTransport,
        new winston.transports.Console(
            {
                format: winston.format.colorize({ all: true })
            }
        )
    ]
});

module.exports = logger;