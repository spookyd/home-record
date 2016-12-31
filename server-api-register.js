/**
 * Created by lukedavis on 12/30/16.
 */
const recordEventApi = require('./api/record_event');

module.exports = function (router) {
    console.log('Registering APIs');
    // Add Api registers here
    recordEventApi.registerRoute(router);

};