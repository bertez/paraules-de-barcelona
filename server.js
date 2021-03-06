var environment = require('./config/environment');

var express = require('express'),
    db = require('./app/models/db');

/**
 * Server module
 */

module.exports.startServer = function() {
    var app = express();

    var port = process.env.PORT || 3000;

    app.set('port', port);

    environment(app);

    /**
     * Server
     */

    app.listen(port, function() {
        console.warn('App running at %s', app.get('port'));
    });
};


if (require.main === module) {
    module.exports.startServer();
}
