
import { TestService } from "../TestService";

export function TestClass() {
    return function(target: any) {
        TestService.Instance.test(target);
        return target;
    }
}