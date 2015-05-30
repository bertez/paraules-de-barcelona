var fs = require('fs');
var path = require('path');

var config = {
    locale: 'gl',
    path: path.join(__dirname, '..'),
    database: {
        protocol: 'sqlite://',
        file:'db.sqlite'
    },
    session: {
        secret: 'SECRET_HERE'
    }
};

module.exports = fs.existsSync(path.join(__dirname, 'local.settings.js')) ? require(path.join(__dirname, 'local.settings.js')) : config;