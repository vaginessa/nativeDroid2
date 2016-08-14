'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (options) {

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

    _self.options = _jquery2.default.extend(_self.defaults, options);

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
        (0, _jquery2.default)(".ui-page:not('.nd2-no-menu-swipe')").on("swiperight swipeleft", function (e) {
            if ((0, _jquery2.default)(".ui-page-active").jqmData("panel") !== "open") {
                if (e.type === "swiperight") {
                    (0, _jquery2.default)(".ui-panel.ui-panel-position-left:first").panel("open");
                }
            }
        });
    };

    _self.iniWow = function () {
        if (typeof _wow2.default !== "undefined") {
            new _wow2.default().init();
        }
    };

    _self.iniWaves = function () {
        if (typeof _nodeWaves2.default !== "undefined") {
            _nodeWaves2.default.attach('a', ['waves-button']);
            _nodeWaves2.default.attach('button', ['waves-button']);
            _nodeWaves2.default.init();
            (0, _jquery2.default)("body").find(".ui-flipswitch-on").removeClass("waves-effect");
            _nodeWaves2.default.attach('.ui-flipswitch', ['waves-button', 'waves-light']);
        }
    };

    _self.iniSmoothTransition = function () {
        (0, _jquery2.default)("body").addClass("nd2-ready");
        (0, _jquery2.default)(document).on("pagechange", function () {
            (0, _jquery2.default)("body").removeClass("nd2-ready");
        }).bind("pagecontainershow ", function (e) {
            (0, _jquery2.default)('body').css('opacity', '1');
        });
        (0, _jquery2.default)(window).on('navigate', function (event, state) {
            (0, _jquery2.default)('body').css('opacity', '1');
        });
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
            send: function send(url) {
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
                    (i[r].q = i[r].q || []).push(arguments);
                }, i[r].l = 1 * new Date();
                a = s.createElement(o), m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m);
            })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

            ga('create', _self.options.stats.analyticsUA, 'auto');
            _ga.send(null);

            // Trigger Page Change

            (0, _jquery2.default)("body").on("pagechange", function (evt, data) {
                _ga.send(_self.getUrlParts(data.options.absUrl).pathname);
            });
        }
    };

    _self.build();
};

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _nodeWaves = require('node-waves');

var _nodeWaves2 = _interopRequireDefault(_nodeWaves);

var _wow = require('wow');

var _wow2 = _interopRequireDefault(_wow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }