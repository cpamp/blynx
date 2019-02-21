

import { StrictTypes, Nullable, Arguments } from "../index";
import { TestClass, TestMethod, Assert } from '@blynx/test';

class Foo {}

class Test {
    @StrictTypes(Function, Boolean, String)
    // @ts-ignore
    public TestMethod(func: any, bool: any, str: any) {
        return true;
    }

    @StrictTypes(String, Array, Nullable(Object))
    // @ts-ignore
    public NoNulls(str: any, arr: any, obj: any) {
        return true;
    }

    @StrictTypes(String, Object, Arguments(String))
    // @ts-ignore
    public Args(str: any, obj: any, ...args: any[]) {
        return true;
    }

    @StrictTypes(String, Object, Arguments(Nullable(String)))
    // @ts-ignore
    public NullArgs(str: any, obj: any, ...args: any[]) {
        return true;
    }

    @StrictTypes(Arguments(String), String)
    // @ts-ignore
    public WrongArgs(str: any, str2: any) {
        return true;
    }

    @StrictTypes(Foo, Nullable(Foo))
    // @ts-ignore
    public CustomClass(foo: any, foo2: any) {
        return true;
    }
}

@TestClass()
export class StrictTypesTest {
    testClass = new Test();
    try(func: ((...args: any[]) => any)) {
        try {
            return func()
        } catch(e) {
            return e;
        }
    }

    @TestMethod()
    testTestMethod(assert: Assert) {
        let res1 = this.try(() => this.testClass.TestMethod(() => {}, true, [])),
            res2 = this.try(() => this.testClass.TestMethod(() => {}, true, '')),
            res3 = this.try(() => this.testClass.TestMethod(null, true, ''));

        assert.areNotEqual(true, res1);
        assert.areEqual(true, res2);
        assert.areNotEqual(true, res3);
    }

    @TestMethod()
    testNoNulls(assert: Assert) {
        let res1 = this.try(() => this.testClass.NoNulls('', [], null)),
            res2 = this.try(() => this.testClass.NoNulls('', [], 'null')),
            res3 = this.try(() => this.testClass.NoNulls('', [], void 0));

        assert.areEqual(true, res1);
        assert.areNotEqual(true, res2);
        assert.areEqual(true, res3);
    }

    @TestMethod()
    testArgs(assert: Assert) {
        let res1 = this.try(() => this.testClass.Args('', {}, '', '')),
            res2 = this.try(() => this.testClass.Args('', {}, '', [])),
            res3 = this.try(() => this.testClass.Args('', {}, '', null));

        assert.areEqual(true, res1);
        assert.areNotEqual(true, res2);
        assert.areNotEqual(true, res3);
    }

    @TestMethod()
    testNullArgs(assert: Assert) {
        let res1 = this.try(() => this.testClass.NullArgs('', {}, '', '')),
            res2 = this.try(() => this.testClass.NullArgs('', {}, '', [])),
            res3 = this.try(() => this.testClass.NullArgs('', {}, '', null));

        assert.areEqual(true, res1);
        assert.areNotEqual(true, res2);
        assert.areEqual(true, res3);
    }

    @TestMethod()
    testWrongArgs(assert: Assert) {
        let res1 = this.try(() => this.testClass.WrongArgs('', ''));

        assert.areNotEqual(true, res1);
    }

    @TestMethod()
    testCustomClass(assert: Assert) {
        let res1 = this.try(() => this.testClass.CustomClass('', null)),
            res2 = this.try(() => this.testClass.CustomClass(new Foo(), null)),
            res3 = this.try(() => this.testClass.CustomClass(new Foo(), new Foo()));

        assert.areNotEqual(true, res1);
        assert.areEqual(true, res2);
        assert.areEqual(true, res3);
    }
}