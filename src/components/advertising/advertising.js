
// nd2-ad
$.widget("nd2.ad", {
    options: {
        banner: null,
        path: null,
        active: null,
        extension: null,
        post: {}
    },
    _create: function() {

        var _self = this;

        window.setTimeout(function() {

            if (typeof window.nd2 !== 'undefined' && typeof window.nd2.settings !== 'undefined' && typeof window.nd2.settings.advertising !== 'undefined') {
                if (typeof window.nd2.settings.advertising.path !== 'undefined') {
                    _self.options.path = window.nd2.settings.advertising.path;
                }
                if (typeof window.nd2.settings.advertising.active !== 'undefined') {
                    _self.options.active = window.nd2.settings.advertising.active;
                }
                if (typeof window.nd2.settings.advertising.extension !== 'undefined') {
                    _self.options.extension = window.nd2.settings.advertising.extension;
                }
            }

            var el = _self.element;
            var opts = $.extend(_self.options, el.data("options"));
            $(document).trigger("createinclude");

            if (opts.active && opts.banner !== null) {
                var src = (opts.path || "") + opts.banner + (opts.extension || "");
                el.addClass("nd2-banner");
                el.load(src, function() {
                    el.enhanceWithin();
                });
            }

        }, 600);

    },
    _update: function() {
        //			console.log("update?");
    },
    refresh: function() {
        return this._update();
    }
});

$(document).bind("pagecreate", function(e) {
    $(document).trigger("includebeforecreate");
    return $("nd2-ad", e.target).ad();
});

