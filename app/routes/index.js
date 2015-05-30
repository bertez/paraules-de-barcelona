var settings = require('../../config/settings');
var helpers = require('../lib/helpers');

var routeManager = function(env) {
    var express = require('express');
    var router = express.Router();

    var controllers = require('../controllers');
    /**
     * Initial middleware
     */

    router.use(function(req, res, next) {
       res.locals.app = 'Example web';
       next();
    });

    /**
     * Routes
     */

    // Index
    router.get('/', controllers.index);

    // Help
    router.get('/help', controllers.help);

    /**
     * Catchers
     */

    router.get('*', function(req, res, next) {
        return next({
            status: 404,
            message: 'Not found'
        });
    });

    router.use(function(err, req, res, next) {
        var status = err.status || 500;

        if(!Array.isArray(err)) {
            err = [err];
        }
        res.status(status);

        res.render('error', {
            jsApp: 'error',
            status: status,
            errors: err,
            layout: 'simple'
        });
    });


    return router;
};

module.exports = routeManager;