import { Symbol } from "../";

let s1 = Symbol()
let s2 = Symbol('name')
let s3 = Symbol('name')
console.log(s1 === s2)
console.log(s2 === s3)
