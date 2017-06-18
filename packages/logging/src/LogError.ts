export type IOutLogErrorString = (constructorName: string, propertyKey: string, err: any) => string

function defaultErrorLog(constructorName: string, propertyKey: string, err: any): string {
    return constructorName + '.' + propertyKey + ' threw error at ' + new Date(Date.now()).toUTCString() + ': ' + err;
}

/**
 * Log method errors
 * 
 * @export
 * @param {(out: string) => void} [pipe=console.error] Pipe method
 * @param {IOutLogErrorString} [errorLog=defaultErrorLog] Error text to log
 * @param {boolean} [reThrow=true] Rethrow the error
 * @returns Decorator
 */
export function LogError(pipe: (out: string) => void = console.error, errorLog: IOutLogErrorString = defaultErrorLog, reThrow: boolean = true) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        var oldFunc = descriptor.value;
        descriptor.value = function() {
            try {
                var result = oldFunc.apply(this, arguments);
            } catch(e) {
                pipe(errorLog(target.constructor.name, propertyKey, e));
                if (reThrow) throw e;
            }
            return result;
        }
    };
}