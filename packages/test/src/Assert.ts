import { TestService } from "./TestService";

export class Assert {
    constructor(private testFunc: () => void) { }

    public areEqual<T>(expected: T, result: T, equality?: (expected: T, result: T) => boolean) {
        if (equality == null) equality = (a, b) => a === b;
        let compareResult = equality(expected, result);
        TestService.Instance.assertResult(this.testFunc, compareResult, expected, result, 'does not equal');
    }

    public areNotEqual<T>(expected: T, result: T, equality?: (expected: T, result: T) => boolean) {
        if (equality == null) equality = (a, b) => a !== b;
        let compareResult = equality(expected, result);
        TestService.Instance.assertResult(this.testFunc, compareResult, expected, result, 'does equal');
    }

    public isNull<T>(object: T) {
        let result = object === null;
        TestService.Instance.assertResult(this.testFunc, result, null, object, 'does not equal');
    }

    public isNotNull<T>(object: T) {
        let result = object !== null;
        TestService.Instance.assertResult(this.testFunc, result, null, object, 'does equal');
    }

    public isUndefined<T>(object: T) {
        let result = object === void 0;
        TestService.Instance.assertResult(this.testFunc, result, void 0, object, 'does not equal');
    }

    public isNotUndefined<T>(object: T) {
        let result = object !== void 0;
        TestService.Instance.assertResult(this.testFunc, result, void 0, object, 'does equal');
    }

    public pass() {
        TestService.Instance.assertResultCustom(this.testFunc, true, '');
    }

    public fail() {
        TestService.Instance.assertResultCustom(this.testFunc, false, 'hit automatic fail point')
    }
}