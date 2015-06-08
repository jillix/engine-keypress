// Dependencies
var wkeypress = require("./wkeypress");

/**
 * init
 *
 * @name init
 * @function
 * @return {undefined}
 */
exports.init = function () {
    var conf = this._config;
    var self = this;
    (conf.shortcuts = conf.shortcuts || []).forEach(function (c) {
        wkeypress(c.k, c.c, function (e) {
            var foo = E.path(c.f, [window, self]);
            if (typeof foo === "function") {
                foo.apply(self, c.args);
            }
        });
    });
};
