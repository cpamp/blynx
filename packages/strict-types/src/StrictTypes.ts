import { IFunction, IHasConstructor, IHasName } from "./IFunction";
import { NullableType } from "./Nullable";
import { ArgumentsType } from "./Arguments";

export function StrictTypes(...classes: IFunction[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        var oldFunc = descriptor.value;
        descriptor.value = function(...args: any[]) {
            if (classes[classes.length - 1] instanceof ArgumentsType) {
                let argClass = (<ArgumentsType>(<any>classes[classes.length - 1])).value;
                classes[classes.length - 1] = argClass;
                while (classes.length < args.length) {
                    classes.push(argClass)
                }
            }
            if (classes.length !== args.length)
                throw "Number of arguments does not match number of types.";
            for (var i = 0; i < args.length; i++) {
                var arg = args[i] as IHasConstructor,
                    c = classes[i] as IHasName;

                if (c instanceof ArgumentsType)
                    throw "Arguments must be the last parameter";

                if (arg != null && arg.constructor !== c && !(c instanceof NullableType))
                    throw invalideType(arg.constructor.name, c.name, i);

                if (!(c instanceof NullableType) && arg == null)
                    throw "Null values not allowed at index: " + i;
                else if (<any>c instanceof NullableType && arg != null && (<NullableType>(<any>c)).value !== arg.constructor)
                    throw invalideType(arg.constructor.name, (<IHasName>(<NullableType>(<any>c)).value).name, i);
            }
            return oldFunc.apply(this, args);
        }
    };
}

function invalideType(name: string, expected: string, index: number) {
    return `Invalid type ${name} at argument index: ${index}; Expected: ${expected}`;
}