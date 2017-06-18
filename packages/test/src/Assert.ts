
import { PASSED } from "./Symbols";
import { TestService } from "./TestService";

export class Assert {
    constructor(private testFunc: () => void) { }

    public AreEqual<T>(expected: T, result: T, equality?: (expected: T, result: T) => boolean) {
        if (equality == null) equality = (a, b) => a === b;
        var compareResult = equality(expected, result);
        TestService.Instance.assertResult(this.testFunc, compareResult, expected, result, 'does not equal');
    }

    public AreNotEqual<T>(expected: T, result: T, equality?: (expected: T, result: T) => boolean) {
        if (equality == null) equality = (a, b) => a !== b;
        var compareResult = equality(expected, result);
        TestService.Instance.assertResult(this.testFunc, compareResult, expected, result, 'does equal');
    }

    public IsNull<T>(object: T) {
        var result = object === null;
        TestService.Instance.assertResult(this.testFunc, result, null, object, 'does not equal');
    }

    public IsNotNull<T>(object: T) {
        var result = object !== null;
        TestService.Instance.assertResult(this.testFunc, result, null, object, 'does equal');
    }

    public IsUndefined<T>(object: T) {
        var result = object === void 0;
        TestService.Instance.assertResult(this.testFunc, result, void 0, object, 'does not equal');
    }

    public IsNotUndefined<T>(object: T) {
        var result = object !== void 0;
        TestService.Instance.assertResult(this.testFunc, result, void 0, object, 'does equal');
    }
}