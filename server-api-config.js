/**
 * Created by lukedavis on 12/31/16.
 */
const registry = require('./server-api-register');

module.exports = function (router) {

    console.log('Registering APIs');

    const apis = registry.registry();
    apis.forEach(function (apiReq) {
        var api = require('./api/' + apiReq);
        console.log('Registering ' + apiReq + ' routes');
        api.registerRoute(router);
    });

};