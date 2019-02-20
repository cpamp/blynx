import { TestClass, TestMethod, Assert } from "../barrel";

@TestClass()
export class Test {
    @TestMethod()
    Test(assert: Assert) {
        assert.areEqual(true, true);
        assert.areNotEqual(true, false);
        assert.areNotEqual(null, undefined);
        assert.isNotNull({});
        assert.isNull(null);
        assert.isNotUndefined({});
        assert.isUndefined(undefined);
        assert.pass();
    }
}