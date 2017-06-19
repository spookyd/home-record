/**
 * Created by lukedavis on 1/3/17.
 */

require('dotenv').config();

const config = {
    env: process.env.NODE_ENVIRONMENT,
    debug: process.env.DEBUG,
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    },
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT
};

module.exports = config;