
import { TestClass, TestMethod, Assert } from "@blynx/test";
import { Injecting, Bar } from "./classes.test";



@TestClass()
export class InjectableTest {
    @TestMethod()
    testNewInjecting(assert: Assert) {
        let inj: Injecting = new (<any>Injecting)();
        assert.isNotNull(inj.foo.foo.bar.p1);
    }

    @TestMethod()
    testNewInjectingPartial(assert: Assert) {
        let inj: Injecting = new (<any>Injecting)(new Bar());
        assert.isNotNull(inj.foo.foo.bar.p1);
        assert.isNotNull(inj.bar.p1);
    }
}