/**
 * Created by lukedavis on 6/17/17.
 */
import winston from 'winston';

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            json: true,
            colorize: true
        })
    ]
});

export default logger;