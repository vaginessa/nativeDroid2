import $ from 'jquery';
import Waves from 'node-waves';
import WOW from 'wow';

export default function (options) {

    // $.nd2

    var _self = this;

    _self.defaults = {
        stats: {
            analyticsUA: null // Your UA-Code for Example: 'UA-123456-78'
        },
        advertising: {
            active: false, // true | false
            path: null, // "/examples/fragments/adsense/",
            extension: null // ".html"
        }
    };


    _self.options = $.extend(_self.defaults, options);

    _self.build = function () {

        _self.globalSettings();
        _self.bindNavigationSwipe();
        _self.iniWow();
        _self.iniWaves();
        _self.iniSmoothTransition();
        _self.iniGoogleAnalytics();

    };

    _self.globalSettings = function () {
        window.nd2 = {
            settings: _self.options
        };
    };

    _self.bindNavigationSwipe = function () {
        $(".ui-page:not('.nd2-no-menu-swipe')").on(
            "swiperight swipeleft", function (e) {
                if ($(".ui-page-active").jqmData("panel") !== "open") {
                    if (e.type === "swiperight") {
                        $(".ui-panel.ui-panel-position-left:first").panel("open");
                    }
                }
            }
        );
    };

    _self.iniWow = function () {
        if (typeof WOW !== "undefined") {
            new WOW().init();
        }
    };

    _self.iniWaves = function () {
        if (typeof Waves !== "undefined") {
            Waves.attach('a', ['waves-button']);
            Waves.attach('button', ['waves-button']);
            Waves.init();
            $("body").find(".ui-flipswitch-on").removeClass("waves-effect");
            Waves.attach('.ui-flipswitch', ['waves-button', 'waves-light']);
        }
    };

    _self.iniSmoothTransition = function () {
        $("body").addClass("nd2-ready");
        $(document).on(
            "pagechange", function () {
                $("body").removeClass("nd2-ready");
            }
        )
            .bind(
                "pagecontainershow ", function (e) {
                    $('body').css('opacity', '1');
                }
            );
        $(window).on(
            'navigate', function (event, state) {
                $('body').css('opacity', '1');
            }
        );
    };

    _self.getUrlParts = function (url) {
        var a = document.createElement('a');
        a.href = url;

        return {
            href: a.href,
            host: a.host,
            hostname: a.hostname,
            port: a.port,
            pathname: a.pathname,
            protocol: a.protocol,
            hash: a.hash,
            search: a.search
        };
    };

    _self.iniGoogleAnalytics = function () {

        var _ga = {
            send: function (url) {
                if (url) {
                    ga('send', 'pageview', url);
                } else {
                    ga('send', 'pageview');
                }
            }
        };

        if (_self.options.stats.analyticsUA) {
            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function () {
                        (i[r].q = i[r].q || []).push(arguments)
                    }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

            ga('create', _self.options.stats.analyticsUA, 'auto');
            _ga.send(null);

            // Trigger Page Change

            $("body").on(
                "pagechange", function (evt, data) {
                    _ga.send(_self.getUrlParts(data.options.absUrl).pathname);
                }
            );

        }

    };

    _self.build();

}