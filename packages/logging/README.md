# logging

Decorate methods for logging

## Log

Log the start and end of a function

```typescript
type IStartLogString = (construcotrName: string, propertyKey: string, args: IArguments) => string;
type IEndLogString = (construcotrName: string, propertyKey: string, result: any) => string;

/**
 * Log start and end of functions
 * 
 * @export
 * @param {(out: string) => void} [pipe=console.log] Pipe method
 * @param {IStartLogString} [start=defaultStart] Start text
 * @param {IEndLogString} [end=defaultEnd] End text
 * @returns Decorator
 */
function Log(pipe: (out: string) => void = console.log, start: IStartLogString = defaultStart, end: IEndLogString = defaultEnd) { ... }
```

## Log Error

Log errors of a function

```typescript
type IOutLogErrorString = (constructorName: string, propertyKey: string, err: any) => string

/**
 * Log method errors
 * 
 * @export
 * @param {(out: string) => void} [pipe=console.error] Pipe method
 * @param {IOutLogErrorString} [errorLog=defaultErrorLog] Error text to log
 * @param {boolean} [reThrow=true] Rethrow the error
 * @returns Decorator
 */
function LogError(pipe: (out: string) => void = console.error, errorLog: IOutLogErrorString = defaultErrorLog, reThrow: boolean = true) { ... }
```

## Example 

```typescript
class Test {
    @Log(console.log, (ctorN, pkey) => `Start ${ctorN}.${pkey}`, (ctorN, pkey, result) => `End ${ctorN}.${pkey} with result: ${result}`)
    public logging() {

    }

    @Log()
    @LogError(console.error, (ctorN, pKey, er) => `${ctorN}.${pKey} throws: ${er}`, false)
    public loggingError() {
        throw "Some Error";
    }
}
```