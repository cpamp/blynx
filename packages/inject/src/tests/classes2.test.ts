import { Injectable } from "../injectable.decorator";
import { Foo as DupeFoo } from "./classes.test";

@Injectable({
    namespace: 'New.Foo'
})
export class Foo {
    constructor(public hello: string = 'world') { }
}

@Injectable()
export class Injecting {
    constructor(public foo: DupeFoo, public foo2: Foo, public test: string, public test2: boolean) { }
}