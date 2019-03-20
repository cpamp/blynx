import { Promise } from "..";

const promisesAplusTests = require('promises-aplus-tests');
const adapter = {
    resolved: (value: any) => Promise.resolve(value),
    rejected: (reason: any) => Promise.reject(reason),
    deferred: Promise.deferred
}

promisesAplusTests(adapter, (err: any) => {
    console.log(err);
})