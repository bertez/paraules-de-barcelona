require(['jquery', 'magnets'], function($, magnets) {
    var $magnets = $('.ui-magnets');

    $.ajax({
        url: '/get/' + $magnets.data('src'),
        method: 'GET',
    })
    .done(function(data) {
        magnets.init({
            $element: $magnets,
            data: JSON.parse(data.postcard)
        });
    })
    .fail(function(xhr, status, error){
        throw new Error(error);
    });

});