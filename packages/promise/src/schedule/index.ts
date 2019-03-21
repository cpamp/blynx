let result: (callback: () => void) => void;
//@ts-ignore
var NativePromise = Promise;

const context = {
    isNode: typeof process !== 'undefined'
}

if (context.isNode) {
    result = typeof global.setImmediate === 'function'
        ? function (fn) { global.setImmediate.call(global, fn); }
        : function (fn) { process.nextTick.call(process, fn); };
} else if (typeof NativePromise === 'function' && typeof NativePromise.resolve === 'function') {
    var resolved = NativePromise.resolve();
    result = function (fn: () => void) {
        resolved.then(fn);
    };
} else if (typeof setImmediate !== 'undefined') {
    result = function (fn) {
        setImmediate(fn);
    };
} else {
    result = function (fn) {
        setTimeout(fn, 0);
    };
}
export const schedule = result