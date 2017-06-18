export type IStartLogString = (construcotrName: string, propertyKey: string, args: IArguments) => string;
export type IEndLogString = (construcotrName: string, propertyKey: string, result: any) => string;

function defaultStart(constructorName: string, propertyKey: string): string {
    return constructorName + '.' + propertyKey + ' started at ' + new Date(Date.now()).toUTCString();
}

function defaultEnd(constructorName: string, propertyKey: string): string {
    return constructorName + '.' + propertyKey + ' ended at ' + new Date(Date.now()).toUTCString();
}

/**
 * Log start and end of functions
 * 
 * @export
 * @param {(out: string) => void} [pipe=console.log] Pipe method
 * @param {IStartLogString} [start=defaultStart] Start text
 * @param {IEndLogString} [end=defaultEnd] End text
 * @returns Decorator
 */
export function Log(pipe: (out: string) => void = console.log, start: IStartLogString = defaultStart, end: IEndLogString = defaultEnd) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        var oldFunc = descriptor.value;
        descriptor.value = function() {
            var result;
            pipe(start(target.constructor.name, propertyKey, arguments));
            try {
                result = oldFunc.apply(this, arguments);
            } catch(e) {
                throw e;
            } finally {
                pipe(end(target.constructor.name, propertyKey, result));
            }
            return result;
        }
    };
}