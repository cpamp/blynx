import { Injectable } from "../injectable.decorator";


@Injectable()
export class Bar {
    constructor(public p1: string = "bye") {}
}

@Injectable()
export class Foo {
    constructor(public bar: Bar) {}
}

@Injectable()
export class FinalInject {
    constructor(public foo: Foo) { }
}

@Injectable({
    exclude: { 'BooBoo.Bar': true }
})
class Injecting {
    constructor(public foo: FinalInject, public bar: Bar) {

    }
}

var inj: Injecting = new (<any>Injecting)()
console.log(inj.foo.foo.bar.p1);
inj.foo.foo.bar.p1 = "hi";

var inj2: Injecting = new (<any>Injecting)(new Bar());
console.log(inj2.foo.foo.bar.p1);
console.log(inj2.bar.p1);