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