import { logDeprecated } from "./logDeprecated";

export function DeprecatedMethod() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        var oldFunc = descriptor.value;
        descriptor.value = function() {
            logDeprecated(target.constructor.name + '.' + propertyKey);
            return oldFunc.apply(this, arguments);
        }
    };
}