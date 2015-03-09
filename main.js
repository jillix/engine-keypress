// Dependencies
var wkeypress = require("./keypress");

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
                foo.call(self, c.args);
            }
        });
    });
};
