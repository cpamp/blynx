import { Injector } from "../injector";
import { TestClass, TestMethod, Assert } from "@blynx/test";
import { Injecting } from "./classes2.test";

@TestClass()
export class InjectableTest2 {
    @TestMethod()
    testNewInjecting(assert: Assert) {
        let inj: Injecting = new (<any>Injecting)("string");
        assert.isNotNull(inj.foo2.hello);
    }

    @TestMethod()
    testInjectInjecting(assert: Assert) {
        let inj = Injector.inject(Injecting, "goodbye", false);
        assert.isNotNull(inj.foo2.hello);
        assert.isNotNull(inj.test);
        assert.isNotNull(inj.test2);
    }
}