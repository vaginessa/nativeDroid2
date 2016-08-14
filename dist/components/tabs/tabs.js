"use strict";

// nd2-tabs
$.widget("nd2.tabs", {
    options: {},
    settings: {
        activeTab: false,
        activeIdx: 0,
        swipe: true
    },
    _create: function _create() {
        var _self = this;
        var el = this.element;
        _self.settings = $.extend(_self.settings, {
            swipe: el.data('swipe')
        });
        el.addClass("nd2Tabs");

        el.find("li[data-tab]").each(function (idx) {
            $(this).addClass("nd2Tabs-nav-item");
            if ($(this).data("tab-active") && !_self.settings.activeTab) {
                $(this).addClass("nd2Tabs-active");
                _self.settings.activeTab = $(this).data("tab");
                _self.settings.activeIdx = idx;
            }
        });

        // Select First if activeTab is not set
        if (!_self.settings.activeTab) {
            var firstEl = el.find("li[data-tab]").first();
            if (firstEl.length > 0) {
                firstEl.addClass("nd2Tabs-active");
                _self.settings.activeTab = firstEl.data("tab");
            } else {
                _self.destroyTabs();
            }
        }

        // Bind Swipe Event
        if (_self.settings.swipe) {
            $("div[role=main]").on("swipeleft", function (event) {
                _self.changeNavTab(true);
            }).on("swiperight", function (event) {
                _self.changeNavTab(false);
            });
        }

        // Waves.js
        if (typeof Waves !== "undefined") {
            Waves.attach('.nd2Tabs-nav-item', ['waves-button', 'waves-light']);
            Waves.init();
        }

        // Bind Events
        el.on("click", ".nd2Tabs-nav-item:not('.nd2Tabs-active')", function (e) {
            e.preventDefault();
            _self.switchTab($(this), $(this).data('tab'), $(this).closest('.nd2Tabs').find(".nd2Tabs-nav-item").index($(this)[0]));
        });

        if (_self.settings.activeTab) {
            _self.prepareTabs();
        }
    },
    _update: function _update() {},
    refresh: function refresh() {
        return this._update();
    },
    destroyTabs: function destroyTabs() {
        this.element.remove();
    },
    changeNavTab: function changeNavTab(left) {
        var $tabs = $('ul[data-role="nd2tabs"] li');

        var len = $tabs.length;
        var curidx = 0;

        $tabs.each(function (idx) {
            if ($(this).hasClass("nd2Tabs-active")) {
                curidx = idx;
            }
        });

        var nextidx = 0;
        if (left) {
            nextidx = curidx >= len - 1 ? 0 : curidx + 1;
        } else {
            nextidx = curidx <= 0 ? len - 1 : curidx - 1;
        }
        $tabs.eq(nextidx).click();
    },
    switchTab: function switchTab(obj, tabKey, toIdx) {
        var _self = this;

        var direction = parseInt(toIdx, 10) > _self.settings.activeIdx ? "right" : "left";
        var directionTo = parseInt(toIdx, 10) < _self.settings.activeIdx ? "right" : "left";

        obj.parent().find(".nd2Tabs-active").removeClass("nd2Tabs-active");

        obj.addClass('nd2Tabs-active');

        _self.settings.activeIdx = parseInt(toIdx, 10);
        _self.settings.activeTab = tabKey;

        // Activate Content Tab
        var oldContent = obj.closest('.ui-page').find(".nd2Tabs-content-tab.nd2Tab-active");

        oldContent.addClass("to-" + directionTo);
        window.setTimeout(function () {
            oldContent.removeClass("nd2Tab-active to-" + directionTo);
        }, 400);

        var newContent = obj.closest('.ui-page').find(".nd2Tabs-content-tab[data-tab='" + _self.settings.activeTab + "']");

        newContent.addClass("nd2Tab-active from-" + direction);

        window.setTimeout(function () {
            newContent.removeClass("from-" + direction);
        }, 150);
    },
    prepareTabs: function prepareTabs() {
        var _self = this;
        var tabs = $("body").find("[data-role='nd2tab']");
        if (tabs.length > 0) {
            tabs.addClass("nd2Tabs-content-tab");
            tabs.each(function (idx) {
                if ($(this).data('tab') == _self.settings.activeTab) {
                    $(this).addClass('nd2Tab-active');
                }
            });
        } else {
            _self.destroyTabs();
        }
    }
});

$(document).bind("pagecreate", function (e) {
    $(document).trigger("includebeforecreate");
    return $("[data-role='nd2tabs']", e.target).tabs();
});