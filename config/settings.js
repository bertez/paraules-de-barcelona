var fs = require('fs');
var path = require('path');

var config = {
    //Mongolab user, pass and url
    dbuser: '',
    dbpass: '',
    dburl: '',
    locale: 'en',
    path: path.join(__dirname, '..'),
    session: {
        secret: 'SESSION_SECRET'
    }
};

module.exports = fs.existsSync(path.join(__dirname, 'local.settings.js')) ? require(path.join(__dirname, 'local.settings.js')) : config;