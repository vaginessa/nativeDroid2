$.widget("nd2.gallery", {
    options: {
        count: 15,
        delay: 100,
        duration: 400,
        cols: 5
    },
    _create: function() {
        var el = this.element;
        var opts = $.extend(this.options, el.data("options"));
        $(document).trigger("creategallery");
        var _html = "";
        var _delay;
        for (var i = 1; i <= opts.count; i++) {
            var calcDelay = (Math.round(i * (opts.delay / 1000) * 10) / 10);
            _delay = (calcDelay > 2) ? (i % 5 / 10) : calcDelay;
            _html += "<div class='dummybox wow zoomIn' data-wow-duration='" + opts.duration + "' data-wow-delay='" + _delay + "s'>" + i + "</div>";
        }
        el.html(_html);
    },
    _update: function() {

    },
    refresh: function() {
        return this._update();
    }
});

$(document).bind("pagecreate", function(e) {
    $(document).trigger("gallerybeforecreate");
    return $("nd2-gallery", e.target).gallery();
});
