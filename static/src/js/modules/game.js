define(['jquery', 'helpers', 'settings'], function($, helpers, settings) {
    var Game = {
        init: function(config) {
            var self = this;

            this.config = config;
            this.callback = config.callback;
            this.total = config.total || 10;

            this.result = [];

            this.$element = config.$element;

            this.$preload = this.$element.find('.ui-preload');
            this.$pictures = this.$element.find('.ui-pictures');
            this.$status = this.$element.find('.ui-status');
            this.$thanks = this.$element.find('.ui-thanks');

            $.ajax({
                url: settings.source,
                method: 'GET'
            })
            .done(function(data) {
                self.images = helpers.shuffleArray(data);
                self.preload();
            })
            .fail(function(xhr, status, error){
                throw new Error(error);
            });

        },
        preload: function() {
            var self = this;
            var total = this.images.length;
            var loaded = 0;

            this.images.forEach(function(image, i) {
                var $image = $('<img />').attr('src', settings.paths.images + image.src);

                $image.data('meta', {
                    src: image.src,
                    parts: image.parts
                });

                image.$element = $image;

                $image.on('load', function() {
                    loaded ++;

                    self.$preload.html('Loading image ' + loaded + ' of ' + total);

                    if(loaded === total) {
                        self.build();
                    }
                });
            });
        },
        build: function() {
            var self = this;
            this.$preload.fadeOut(function() {
                self.$status.fadeIn('slow');
            });

            this.images.forEach(function(image) {
                var $option = image.$element;

                $option.addClass('is-hidden ui-option')
                    .one('click', function() {
                        var $this = $(this);

                        $this.addClass('ui-selected');

                        self.result.push($this.data('meta'));

                        self.$status.find('.ui-hearts i').eq(self.result.length -1).css('opacity', 1);

                        if(self.result.length === self.total) {
                            self.finish();
                        }
                    });

                $option.appendTo(self.$pictures);
            });

            this.$pictures.fadeIn('slow');

            this.cycle();
        },
        cycle: function() {
            var total = this.images.length,
                $current,
                self = this;

            var $allImages = self.$pictures.find('img');

            this.interval = setInterval(function() {

                var $images = $allImages.not('.ui-selected');

                $allImages.addClass('is-hidden');

                if(!$current) {
                    $current = $images.eq(0).removeClass('is-hidden');
                } else {
                    $current.removeClass('is-hidden');
                }

                $current = $current.nextAll(':not(.ui-selected):first');

                if(!$current.length) {
                    $current = $images.eq(0);
                }
            }, 1000);
        },
        finish: function() {
            this.$pictures.fadeOut();
            this.$status.fadeOut();
            this.$thanks.fadeIn();

            this.callback(this.result);
        }
    };



    return Game;
});