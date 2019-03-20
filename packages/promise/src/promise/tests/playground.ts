import { Promise } from "../";

let p = new Promise((resolve) => {
    console.log('start');
    setTimeout(function () {
        resolve('done');
        resolve('NO NO NO')
    }, 1000)
})

p.then(value => {
    console.log(value);
    return 55;
}).then(value => console.log(value));

p.then(value => console.log(`${value} Two`))

let p2 = new Promise((resolve, reject) => {
    reject(1);
    resolve('nope');
});

p2.then(() => console.log('never'), err => console.log(err));

new Promise(() => {
    throw 'f';
}).then(null, val => console.log(val));


Promise.resolve({a: ''}).then(value => console.log(value));
Promise.reject({a: ''}).then(null, err => console.log('err', err));

let deferred = Promise.deferred();
deferred.resolve({b: ''});
deferred.promise.then(val => console.log(val));

let deferred2 = Promise.deferred();
deferred2.reject({b: ''});
deferred2.promise.then(null, err => console.log('err', err));

var promise2 = Promise.reject().then(null, function onRejected() {
    throw 'reason';
});

promise2.then(null, function onPromise2Rejected(actualReason) {
    console.log('rejected', actualReason === 'reason');
});