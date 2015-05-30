require.config({
    baseUrl: 'js',
    paths: {
        /**
         * Components
         */
        'jquery': '../vendor/jquery/dist/jquery',
        'bootstrap': '../vendor/bootstrap-sass/assets/javascripts/bootstrap',
        /**
         * Modules
         */
        'shared': 'modules/shared',
        /**
         * Apps
         */
        'index': 'app/index'
    },
    shim: {
        "bootstrap": {
            "deps": ['jquery']
        }
    }
});

require(['jquery', 'bootstrap', 'shared'], function() {
    console.log('hello from main');
});