(function (root) {

    function getChar(e) {
        var keynum;

        if (window.event) {
            keynum = e.keyCode;
        } else if(e.which){
            keynum = e.which;
        }

        return keynum;
    }

    var _handlers = {
        chars: {},
        shift: {},
        ctrl: {},
        alt: {}
    };

    function wkeypress (chr, key, callback) {
        if (typeof key === "function") {
            callback = key;
            key = null;
        }
        key = /^ctrl|shift|alt$/.test(key) ? key : "chars";
        (_handlers[key][chr] = _handlers[key][chr] || []).push(callback);
    }

    function clbk(arr, scope, args) {
        if (arr.length) {
            args[0].preventDefault();
        }
        arr.forEach(function (c) {
            c.apply(scope, args);
        });
    }

    window.addEventListener("keydown", function (e) {

        var charp = getChar(e);
        var callbacks = {};
        Object.keys(_handlers).forEach(function (c) {
            callbacks[c] = _handlers[c][charp] || [];
        });

        if (e.ctrlKey) {
            clbk(callbacks.ctrl, this, [e]);
        } else if (e.shiftKey) {
            clbk(callbacks.shift, this, [e]);
        } else if (e.altKey) {
            clbk(callbacks.alt, this, [e]);
        } else {
            clbk(callbacks.chars, this, [e]);
        }

    });

    if (root) {
        root.exports = wkeypress;
    } else {
        root.wkeypress = wkeypress;
    }
})(module);
