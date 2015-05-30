define(['jquery'], function($) {
    return {
        shuffleArray: function(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        },
        randomBetween: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        pick: function(array) {
            return array[this.randomBetween(0, array.length -1)];
        }
    };
});
