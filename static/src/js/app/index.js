require(['jquery', 'game', 'magnets', 'helpers'], function($, game, magnets, helpers) {
    var $start = $('.ui-start');
    var $intro = $('.ui-intro');

    var $game = $('.ui-game');
    var $magnets = $('.ui-magnets');
    var $end = $('.end');
    var quotesInterval;

    var $audio = $('audio');
    $audio.get(0).volume = 0.4;

    var $video = $('video');
    $video.on('timeupdate', function() {
        var video = $video.get(0);

        if (video.currentTime > 9) {
            video.currentTime = 1;
        }
    });

    $('.ui-start .next').on('click', function() {
        $start.fadeOut(function() {
            $start.remove();
            $intro.fadeIn();

            var $quotes = $('.ui-intro .quotes span'),
                $current;

            $quotes.slice(1).hide();

            quotesInterval = setInterval(function() {
                $quotes.hide();
                if (!$current) {
                    $current = $quotes.eq(1).fadeIn();
                } else {
                    $current.fadeIn();
                }

                $current = $current.next();

                if (!$current.length) {
                    $current = $quotes.eq(0);
                }
            }, 10000);

        });
    });

    $('.ui-intro .next').on('click', function() {
        clearTimeout(quotesInterval);
        $intro.fadeOut(function() {
            $intro.remove();
            $game.fadeIn(function() {

                //Init game
                game.init({
                    $element: $game,
                    total: 10,
                    callback: function(result) {
                        var pieces = [];

                        result.forEach(function(pic) {
                            var part = helpers.pick(pic.parts);

                            pieces.push({
                                img: pic.src.split('.')[0] + '-' + helpers.pick(pic.parts) + '.jpg',
                                original: pic.src
                            });
                        });

                        pieces.push({
                            img: 'bcn_150px.png',
                            main: 1
                        });
                        setTimeout(function() {
                            $game.fadeOut(function() {
                                $game.remove();
                                magnets.init({
                                    data: pieces,
                                    $element: $magnets,
                                    $end: $end,
                                    edit: true
                                });
                            });

                        }, 2000);
                    }
                });
            });
        });
    });



});
