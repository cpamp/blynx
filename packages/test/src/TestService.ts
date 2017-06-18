
import { TESTABLE, PASSED, RESULT_MESSAGE } from "./Symbols";
import { EscapeText } from "./Text";
import { Assert } from "./Assert";
import * as colors from "colorful-text";

export class TestService {
    private static instance: TestService;
    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    public markTestable(testable: () => void, propertyKey: string) {
        Object.defineProperty(testable, 'name', {
            value: propertyKey,
            enumerable: false,
            writable: false,
        });
        (<any>testable)[TESTABLE] = true;
    }

    public assertResult<T>(testFunc: () => void, passed: boolean, expected: T, result: T, compareText: string) {
        if ((<any>testFunc)[PASSED] === void 0) (<any>testFunc)[PASSED] = true;
        if ((<any>testFunc)[RESULT_MESSAGE] === void 0) (<any>testFunc)[RESULT_MESSAGE] = '';
        if (!passed) {
            (<any>testFunc)[PASSED] = false;
            (<any>testFunc)[RESULT_MESSAGE] +=
                EscapeText.TAB + EscapeText.X + ' ' + (<any>testFunc).name + ' Failed: expected result ' + expected + ' ' + compareText + ' actual result ' + result + EscapeText.NEW_LINE;
        }
    }

    private getAllPropertyNames(object: any) {
        var props: any[] = [];

        do {
            props= props.concat(Object.getOwnPropertyNames(object));
        } while (object = Object.getPrototypeOf(object));

        return props;
    }

    public test<T>(testClass: {new(...args: any[]): T}) {
        var testInstance = new testClass();

        var passed: boolean = true;
        var message: string = '';
        var totalCount: number = 0;
        var passedCount: number = 0;
        var properties = this.getAllPropertyNames(testClass.prototype);
        for (let method of properties) {
            if (method !== 'constructor' && (<any>testInstance)[method][TESTABLE]) {
                totalCount++;
                try {
                    (<any>testInstance)[method](new Assert((<any>testInstance)[method]));
                    if ((<any>testInstance)[method][PASSED] === false) {
                        passed = false;
                        message += (<any>testInstance)[method][RESULT_MESSAGE];
                    } else {
                        passedCount++;
                    }
                } catch(e) {
                    passed = false;
                    message += EscapeText.TAB + EscapeText.X + ' ' + method + ' Failed on ERROR: ' + e + EscapeText.NEW_LINE;
                }
            }
        }
        var classMessage = (passed ? EscapeText.CHECK : EscapeText.X) + ' ' + (<any>testClass).name + ' (' + passedCount + ' of ' + totalCount + ') Passed' + EscapeText.NEW_LINE;
        message = (classMessage + message).slice(0, -1);
        message = (passed ? colors.fg.green(message) : colors.fg.red(message));
        console.log(colors.bg.black(message));
    }
}