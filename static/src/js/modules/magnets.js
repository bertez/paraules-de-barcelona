define(['jquery', 'settings', 'helpers', 'jquery-ui'], function($, settings, helpers) {
    var Magnets = {
        init: function(config) {
            var self = this;
            this.config = config;

            this.edit = config.edit;

            this.$element = config.$element;

            if (config.edit) {
                this.$share = config.$element.find('.ui-share');
                this.$backgrounds = config.$element.find('.ui-backgrounds');
                this.$end = config.$end;

                this.$end.find('.close').on('click', function() {
                    self.$end.fadeOut();
                });

                this.data = config.data;

                this.$share.find('button').on('click', function() {
                    self.post();
                });

                $.ajax({
                        url: settings.backgrounds,
                        method: 'GET'
                    })
                    .done(function(data) {
                        self.backgrounds = data;
                        self.build();
                    })
                    .fail(function(xhr, status, error) {
                        throw new Error(error);
                    });

            } else {
                self.$element.css('background-image', 'url(' + settings.paths.backgrounds + config.data.background + ')');
                this.data = config.data.magnets;
                this.build();
            }

            var margin = 100;

            this.dimensions = {
                width: $(window).width(),
                height: $(window).height()
            };

        },
        build: function() {
            var self = this;

            if (this.backgrounds) {
                this.backgrounds.forEach(function(bg, i) {
                    var $icoBg = $('<img />').attr('src', settings.paths.backgrounds + 'thumb_' + bg);

                    $icoBg.on('click', function() {

                        self.selectedBg = bg;

                        self.$element.css('background-image', 'url(' + settings.paths.backgrounds + bg + ')');

                        self.$backgrounds.find('img').removeClass('selected');
                        $(this).addClass('selected');
                    });

                    $icoBg.appendTo(self.$backgrounds);

                    if (i === 0) {
                        $icoBg.trigger('click');
                    }
                });


            }

            this.data.forEach(function(magnet) {
                var $magnet = $('<img />')
                    .attr('src', settings.paths.parts + magnet.img)
                    .data('original', magnet.original)
                    .data('img', magnet.img)
                    .data('main', magnet.main || 0)
                    .addClass('magnet');

                if (!magnet.position) {
                    $magnet.css({
                        top: (self.dimensions.height / 4) + helpers.randomBetween(-(self.dimensions.height / 4), self.dimensions.height / 4),
                        left: (self.dimensions.width / 4) + helpers.randomBetween(-(self.dimensions.width / 4), self.dimensions.width / 4)
                    });
                } else {
                    $magnet.css({
                        top: magnet.position.top + '%',
                        left: magnet.position.left + '%'
                    });
                }

                if (!magnet.class) {
                    var cl = 'rotate_' + helpers.randomBetween(0, 10);
                    $magnet.addClass(cl);
                    $magnet.data('class', cl);
                } else {
                    $magnet.addClass(magnet.class);
                }

                if (self.edit) {
                    $magnet.draggable({
                        cursor: "move"
                    }).on('dblclick', function() {
                        if (!magnet.main) {
                            $magnet.remove();
                        }
                    });
                }

                if (+magnet.main) {
                    $magnet.css('box-shadow', 'none');
                }

                $magnet.appendTo(self.$element);
            });

            this.$element.fadeIn();
        },
        serialize: function() {
            var self = this,
                result = [];

            // img
            // original
            // class
            // position: top, left

            this.$element.find('.magnet').each(function(magnet) {
                var $this = $(this);
                var position = $this.offset();
                var part = {};

                part.img = $this.data('img');
                part.original = $this.data('original');
                part.class = $this.data('class');
                part.position = {
                    top: (position.top / self.dimensions.height) * 100,
                    left: (position.left / self.dimensions.width) * 100
                };
                part.main = $this.data('main');

                result.push(part);

            });

            var payload = {
                background: this.selectedBg,
                magnets: result
            };

            return payload;
        },
        post: function() {
            var self = this,
                payload = this.serialize();

            $.ajax({
                    method: 'POST',
                    data: payload
                })
                .done(function(data) {
                    var url = window.location + 's/' + data.id;

                    var twitter_share = 'https://twitter.com/home?status=Check out these Paraules from Barcelona ';
                    var facebook_share = 'https://www.facebook.com/sharer/sharer.php?u=';


                    self.$end.find('.url').val(url);
                    self.$end.find('.twitter').attr('href', twitter_share + url);
                    self.$end.find('.facebook').attr('href', facebook_share + url);
                    self.$end.find('.link').attr('href', url);

                    self.$end.fadeIn();
                })
                .fail(function(xhr, status, error) {
                    throw new Error(error);
                });
        }
    };

    return Magnets;
});
