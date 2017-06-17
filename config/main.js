/**
 * Created by lukedavis on 1/3/17.
 */

module.exports = {
    // Secret key for JWT signing and encryption
    'secret': 'JaQ8j8!3aG{ItMH',
    // Database connection information
    'database': 'mongodb://mongo:27017',
    // Setting port for server
    'port': process.env.PORT || 8080
};