var settings = require('../../config/settings');
var helpers = require('../lib/helpers');
var orm = require('orm');


module.exports = {
    index: function(req, res, next) {
        res.render('home', {
            jsApp: 'index',
            meta: {
                title: 'Homepage'
            },
            greeting: 'Hello from homepage'
        });
    },
    help: function(req, res, next) {
        res.render('home', {
            jsApp: 'help',
            meta: {
                title: 'Help'
            }
        });
    }

};