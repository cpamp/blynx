
/**
 * js-injectable helper
 * 
 * @export
 * @class Injector
 */
export class Injector {
    /**
     * Instantiate a class decorated with Injectable
     * 
     * @static
     * @template T Type of class
     * @param {{new(...args: any[]): T}} newType The class to instantiate
     * @param {...any[]} args Arguments, use for excluded injectables
     * @returns {T} New instance of T
     * 
     * @memberOf Injector
     */
    public static inject<T>(newType: {new(...args: any[]): T}, ...args: any[]): T {
        var result: T = new (<any>newType)(...args);
        return result;
    }
}