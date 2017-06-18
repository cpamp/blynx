import { Injectable, Injector } from "../index";

@Injectable()
export class Bar {
    constructor(public barProp: string = "Bar") {}
}

@Injectable()
export class Foo {
    constructor(public myString: string, public bar: Bar) {}
}

var myFoo = Injector.inject(Foo, "myString");
console.log(myFoo.myString == "myString");
console.log(myFoo.bar.barProp == "Bar");
myFoo.bar.barProp = "FooBar"

var myFoo2: Foo = new (<any>Foo)("mySecondString");
console.log(myFoo2.myString == "mySecondString");
console.log(myFoo2.bar.barProp == "FooBar");