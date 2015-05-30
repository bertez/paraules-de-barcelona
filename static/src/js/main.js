require.config({
    baseUrl: '/js',
    paths: {
        'settings': 'settings',
        /**
         * Components
         */
        'jquery': '../vendor/jquery/dist/jquery',
        'jquery-ui': '../vendor/jquery-ui/jquery-ui',
        /**
         * Modules
         */
        'shared': 'modules/shared',
        'game': 'modules/game',
        'magnets': 'modules/magnets',
        'helpers': 'modules/helpers',
        /**
         * Apps
         */
        'main': 'app/index',
        'single': 'app/single'
    },
    shim: {
        'jquery-ui': {
            'deps': ['jquery']
        }
    }
});

require(['jquery'], function() {

    //Start
    var startModuleName = $('script[data-start]').attr('data-start');

    if (startModuleName) {
        require([startModuleName]);
    }

});