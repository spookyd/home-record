/**
 * Created by lukedavis on 1/3/17.
 */

require('dotenv').config();

const config = {
    env: process.env.NODE_ENV,
    debug: process.env.DEBUG,
    db: process.env.DB_HOST + ':' + process.env.DB_PORT,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT
};

module.exports = config;