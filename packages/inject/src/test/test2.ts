import { Injectable } from "../injectable.decorator";
import { Foo as DupeFoo } from "./test";
import { Injector } from "../injector";

@Injectable({
    namespace: 'New.Foo'
})
class Foo {
    constructor(public hello: string = 'world') { }
}

@Injectable()
class Injecting {
    constructor(public foo: DupeFoo, public foo2: Foo, public test: string, public test2: boolean) { }
}

var inj: Injecting = new (<any>Injecting)("string");
console.log(inj.foo2.hello);
console.log(inj.test);

var inj2 = Injector.inject(Injecting, "goodbye", false);
console.log(inj2.foo2.hello);
console.log(inj2.test);
console.log(inj2.test2);