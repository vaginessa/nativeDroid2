
// nd2-include
$.widget("nd2.include", {
    options: {
        src: null,
        post: {}
    },
    _create: function() {
        var el = this.element;
        var opts = $.extend(this.options, el.data("options"));
        $(document).trigger("createinclude");

        if (opts.src !== null) {
            el.load(opts.src, function() {
                el.enhanceWithin();

                // Apply waves.js
                if (typeof Waves !== "undefined") {
                    Waves.attach('a', ['waves-button']);
                    Waves.attach('button', ['waves-button']);
                    Waves.init();

                    $("body").find(".ui-flipswitch-on").removeClass("waves-effect");
                    Waves.attach('.ui-flipswitch', ['waves-button', 'waves-light']);

                }

            });
        }
    },
    _update: function() {
        console.log("update?");
    },
    refresh: function() {
        return this._update();
    }
});

$(document).bind("pagecreate", function(e) {
    $(document).trigger("includebeforecreate");
    return $("nd2-include", e.target).include();
});

