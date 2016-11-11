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
        res.locals.app = 'Paraules de Barcelona';
        next();
    });

    /**
     * Routes
     */

    // Main
    router.get('/', controllers.index);
    router.post('/', controllers.create);

    //List
    router.get('/list', controllers.list);

    // Single
    router.get('/s/:id', controllers.share);
    router.get('/get/:id', controllers.get);

    //JSON Static
    var data = require('../../data');
    Object.keys(data).forEach(function(d) {
        router.get('/data/' + d + '.json', function(req, res) {
            res.json(data[d]);
        });
    });

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

        if (!Array.isArray(err)) {
            err = [err];
        }
        res.status(status);

        res.render('error', {
            page: 'simple',
            status: status,
            errors: err,
            layout: 'simple',
            meta: {
                title: 'Error: Paraules de Barcelona'
            }
        });
    });


    return router;
};

module.exports = routeManager;
