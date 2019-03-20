declare const Promise: any;

const promisesAplusTests = require('promises-aplus-tests');

let deferred = () => {
    let resolve: (value: any) => void = () => {};
    let reject: (reject: any) => void = () => {};
    let promise = new Promise((_resolve: any, _reject: any) => {
        resolve = _resolve;
        reject = _reject;
    })
    return { promise, resolve, reject }
}

const adapter = {
    resolved: (v: any) => Promise.resolve(v),
    rejected: (r: any) => Promise.reject(r),
    deferred: deferred
}

promisesAplusTests(adapter, (err: any) => {
    console.log(err);
})