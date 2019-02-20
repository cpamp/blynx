import { TestService } from "../TestService";

export function TestMethod() {
    return function (target: any, propertyKey: string) {
        TestService.Instance.markTestable(target[propertyKey], propertyKey);
    };
}