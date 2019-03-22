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
    
})

let mapper = Promise.resolve([1,2,3,4,5])

mapper.map(val => {
    return val * 10;
}).then(val => console.log(val));

mapper.map(val => val / 0).catch(err => console.log(err));