let result: (callback: () => void) => void;
//@ts-ignore
var NativePromise = Promise;

if (typeof setImmediate === 'function') {
    result = fn => setImmediate(fn)
} else if (process && typeof process.nextTick === 'function') {
    result = fn => process.nextTick(fn)
} else {
    result = fn => setTimeout(fn, 0)
}
export const schedule = result