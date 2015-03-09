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
    (conf.shortcuts = conf.shortcuts || []).forEach(function (c) {
        wkeypress(c.c, c.k, function (e) {
            var foo = E.path(c.f, [window]);
            if (typeof foo === "function") {
                foo(e);
            }
        });
    });
};
