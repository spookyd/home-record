/**
 * Created by lukedavis on 6/17/17.
 */
const winston = require('winston');

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            json: true,
            colorize: true
        })
    ]
});

module.exports = logger;