import { Promise } from "..";

var p = Promise.reject(new Error());

p.catch(err => {
    console.log('instanceof Error === true: ', err instanceof Error === true);
});

p.catch(err => {
    if (err) { }
}).finally(() => console.log('always')).then(value => {
    console.log(value);
    console.log('value === undefined: ', value === undefined)
});

let result = {};
Promise.resolve(result).finally(() => console.log('always')).then(value => {
    console.log('value === {}: ', value === result);
});

Promise.resolve(1).then(() => {
    return Promise.reject(new Error())
}).catch(err => console.log(err))

Promise.resolve(1).then(() => {
    return {a: '', b: ''}
}).then(val => {
    console.log(val);
})

let mapper = Promise.resolve([1,2,3,4,5])

mapper.map(val => {
    return val * 10;
}).then(val => console.log(val));

mapper.map(val => val / 0).catch(err => console.log(err));

Promise.resolve().timeout(2000).then(() => console.log('Timed out'));

Promise.any(Promise.resolve(10).timeout(500), Promise.resolve(1000).timeout(1000)).then(val => console.log('any 10: ', val));

Promise.any(Promise.resolve(0).timeout(1000), Promise.reject(50).timeout(50)).catch(reason => console.log('any 50: ', reason))