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
export class Injecting {
    constructor(public foo: FinalInject, public bar: Bar) {

    }
}