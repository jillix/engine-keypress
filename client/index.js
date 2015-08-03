// Dependencies
var wkeypress = require("./wkeypress");

function emit (eventName, data) {
    var self = this;
    self._streams = self._streams || {};

    // create stream
    var str = self._streams[eventName] || (self._streams[eventName] = self.flow(eventName));
    str.write(null, data);
}

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
    self.emit = emit;
    (conf.shortcuts = conf.shortcuts || []).forEach(function (c) {
        wkeypress(c.k, c.c, function (e) {

            // emit all shortcut arguments
            (c.args = c.args || []).forEach(function (eventName) {
                self.emit(eventName);
            });
        });
    });
};
