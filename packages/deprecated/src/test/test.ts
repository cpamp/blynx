

import { DeprecatedClass } from "../DeprecatedClass";
import { DeprecatedMethod } from "../DeprecatedMethod";

@DeprecatedClass()
export class Deprecated {
    @DeprecatedMethod()
    public test(value: string) {
        console.log(value);
    }
}

var t = new Deprecated();
t.test("hi");