require.config({
    baseUrl: 'js',
    paths: {
        'config': 'config',
        /**
         * Components
         */
        'jquery': '../vendor/jquery/dist/jquery',
        /**
         * Modules
         */
        'shared': 'modules/shared',
        'game': 'modules/game',
        'magnets': 'modules/magnets',
        /**
         * Apps
         */
        'main': 'app/index',
        'single': 'app/single'
    },
    shim: {
    }
});

require(['jquery', 'shared'], function() {

    //Start
    var startModuleName = $('script[data-start]').attr('data-start');

    if (startModuleName) {
        require([startModuleName]);
    }

});