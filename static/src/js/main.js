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
        require(['app/' + startModuleName]);
    }

});