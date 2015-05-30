var settings = require('../../config/settings');
var helpers = require('../lib/helpers');


module.exports = {
    index: function(req, res, next) {
        res.render('home', {
            jsApp: 'main',
            meta: {
                title: 'Paraules de Barcelona'
            }
        });
    },
    create: function(req, res, next) {

    },
    get: function(req, res, next) {
        res.render('single', {
            jsApp: 'single',
            meta: {
                title: 'Single'
            }
        });

    }

};