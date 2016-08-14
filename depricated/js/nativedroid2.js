//
// ...the magic starts here...
//
/////////////////////////////////


// ND2 Widgets

;(function(factory) {

  // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
  // We use `self` instead of `window` for `WebWorker` support.
  var root = (typeof self === 'object' && self.self === self && self) ||
            (typeof global === 'object' && global.global === global && global);

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'Waves', 'exports' ], function($, Waves, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      factory($, Waves, exports);
      return $;
    });

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var $ = require('jquery');
    var Waves = require('Waves');
    factory(root, Waves, root);
  // Finally, as a browser global.
  } else {
    factory(root.jQuery || root.$, root.Waves || undefined, root);
  }

}(function($, Waves, exports) {
    "use strict";

    exports.chartThemeGenerator = function(color) {

        var _self = this;

        _self.colorIndex = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey'];
        _self.colorHex = {
                red: '#F44336',
                pink: '#E91E63',
                purple: '#9C27B0',
                deep_purple: '#673AB7',
                indigo: '#3F51B5',
                blue: '#2196F3',
                light_blue: '#03A9F4',
                cyan: '#00BCD4',
                teal: '#009688',
                green: '#4CAF50',
                light_green: '#8BC34A',
                lime: '#CDDC39',
                yellow: '#FFEB3B',
                amber: '#FFC107',
                orange: '#FF9800',
                deep_orange: '#FF5722',
                brown: '#795548',
                grey: '#9E9E9E',
                blue_grey: '#607D8B'
            },

            _self.indexByColor = _self.colorIndex.indexOf(color);

        _self.alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r'];

        if (_self.indexByColor > -1) {
            var colorArray = [];
            var colorArrayAfter = [];
            var cLoop = 0;
            _self.colorIndex.forEach(function(ci) {
                if (cLoop < _self.indexByColor) {
                    colorArrayAfter.push(ci);
                } else {
                    colorArray.push(ci);
                }
                cLoop++;
            });

            colorArray = colorArray.concat(colorArrayAfter);

            var css = [];

            for (var i = 0; i < _self.alpha.length; i++) {
                var alpha = _self.alpha[i];
                var colorName = colorArray[i];
                var colorNice = colorName.replace('-', '_');
                var hex = _self.colorHex[colorNice];
                // General
                // css.push(".nd2-chart .ct-series-"+alpha+" .ct-bar, .nd2-chart .ct-series-"+alpha+" .ct-line, .nd2-chart .ct-series-"+alpha+" .ct-point, .nd2-chart .ct-series-"+alpha+" .ct-slice-donut {	stroke: "+hex+"; } .nd2-chart .ct-series-"+alpha+" .ct-area, .nd2-chart .ct-series-"+alpha+" .ct-slice-pie { fill: "+hex+"; } ");

                // Color Themes
                css.push(".nd2-chart.clr-theme-" + color + " .ct-series-" + alpha + " .ct-bar, .nd2-chart.clr-theme-" + color + " .ct-series-" + alpha + " .ct-line, .nd2-chart.clr-theme-" + color + " .ct-series-" + alpha + " .ct-point, .nd2-chart.clr-theme-" + color + " .ct-series-" + alpha + " .ct-slice-donut {	stroke: " + hex + "; } .nd2-chart.clr-theme-" + color + " .ct-series-" + alpha + " .ct-area, .nd2-chart.clr-theme-" + color + " .ct-series-" + alpha + " .ct-slice-pie { fill: " + hex + "; } ");
            }

            console.log("/* Chart-Color-Theme: " + color + " */\n" + css.join(" ") + "\n\n");

        }

    };

}));
