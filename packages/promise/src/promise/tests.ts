import { Promise } from ".";

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