var settings = require('../../config/settings');
var helpers = require('../lib/helpers');
var itemd = require('../models/items');


module.exports = {
    index: function(req, res, next) {
        res.render('home', {
            page: 'index',
            meta: {
                title: 'Paraules de Barcelona'
            }
        });
    },
    create: function(req, res, next) {
        var content = JSON.stringify(req.body);
        console.log(content);
        itemd.saveitem(content, function(err, item) {
            if (err) {
                return next(err);
            }
            res.json({
                'id': item._id
            });
        });
    },
    get: function(req, res, next) {
        itemd.getitem(req.params.id, function(err, item) {
            if (err) {
                return next(err);
            }
            res.json({
                'postcard': item.content
            });
        });
    },
    share: function(req, res, next) {
        res.render('single', {
            page: 'single',
            id: req.params.id,
            meta: {
                title: 'Paraules de Barcelona'
            }
        });
    },
    list: function(req, res, next) {
        itemd.list(function(err, items) {
            res.render('list', {
                page: 'list',
                items: items,
                total: items.length,
                layout: 'simple',
                meta: {
                    title: 'List of items: Paraules de Barcelona'
                }
            });
        });
    }

};