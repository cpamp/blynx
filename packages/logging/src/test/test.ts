

import { Log } from "../Log";
import { LogError } from "../LogError";

export class Test {
    @Log(console.log, (ctorN, pkey) => `Start ${ctorN}.${pkey}`, (ctorN, pkey, result) => `End ${ctorN}.${pkey} with result: ${result}`)
    public logging() {

    }

    @Log()
    @LogError(console.error, (ctorN, pKey, er) => `${ctorN}.${pKey} throws: ${er}`, false)
    public loggingError() {
        throw "Some Error";
    }
}

var t = new Test();

t.logging();
t.loggingError();