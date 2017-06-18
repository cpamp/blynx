import { logDeprecated } from "./logDeprecated";

export function DeprecatedClass() {
    return function(constructor: Function) {
        var newConstructor = function(...args: any[]) {
            logDeprecated((<any>constructor).name);
            return constructor.apply(this, args);
        }
        
        newConstructor.prototype = Object.create(constructor.prototype);
        newConstructor.prototype.constructor = constructor;

        return <any>newConstructor
    }
}