/**
 * Created by lukedavis on 12/31/16.
 */
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import expressWinston from 'express-winston';
import helmet from 'helmet';
import winstonInstance from './winston';
import routes from '../api/routes/index.route';
import config from './config';

const app = express();

if (config.env === 'development') {
    app.use(logger('dev'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

// enable detailed API logging in dev env
if (config.env === 'development') {
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
    app.use(expressWinston.logger({
        winstonInstance,
        meta: true, // optional: log meta data about request (defaults to true)
        msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
        colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
    }));
}

// mount all routes on /api path
app.use('/api', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('API route not found', 404);
    return next(err);
});

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
    app.use(expressWinston.errorLogger({
        winstonInstance
    }));
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
    res.status(err.status).json({
        message: config.env === 'development' ? err.message : err.status,
        stack: config.env === 'development' ? err.stack : {}
    })
);

export default app;