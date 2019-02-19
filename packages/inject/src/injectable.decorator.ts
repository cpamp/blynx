import "reflect-metadata";
import { InjectProvider } from "./inject.provider";
import { getOptions } from "./getOptions";
import { ParamTypes } from "./constants";
import { getName } from "./getName";

function getNewConstructor(constructor: Function, params: any[]) {
    return function(this: any, ...args: any[]) {
        var newParams = params.slice(0);
        for (let j = 0; j < args.length; j++) {
            let arg = args[j];
            for (let i = 0; i < newParams.length; i++) {
                if (newParams[i] === void 0) {
                    (<any>newParams)[i] = arg;
                    break;
                }
            }
        }
        return constructor.apply(this, newParams);
    }
}

function getParams(excludes: any, metadata: any) {
    var params: any[] = [];
    for (let i = 0; i < metadata.length; i++) {
        let meta = metadata[i];
        var key = getName(meta);
        if (excludes[key] !== true) {
            params.push(InjectProvider.Instance.get(meta));
        } else {
            params.push(void 0);
        }
    }
    return params;
}

function setupNewConstructorPrototype(originalConstructor: Function, newConstructor: Function) {
    newConstructor.prototype = Object.create(originalConstructor.prototype);
    newConstructor.prototype.constructor = originalConstructor;
    Object.defineProperty(newConstructor, 'name', { value: getName(<any>originalConstructor), enumerable: false, writable: false });
}

/**
 * Inject dependencies into constructor
 * 
 * @export
 * @param {IInjectOptions} [options={}] Options
 * @param {Function} constructor Constructor to inject into
 * @returns {Function} New constructor
 */
function Inject(options: IInjectableOptions, constructor: Function) {
    var metadata = Reflect.getMetadata(ParamTypes, constructor);
    if (metadata != null) {
        var params = getParams(options.exclude, metadata);
        var newConstructor = getNewConstructor(constructor, params);
        setupNewConstructorPrototype(constructor, newConstructor);

        var newMetadata = [];
        for (let i = 0; i < metadata.length; i++) {
            let meta = metadata[i];
            if ((<any>options.exclude)[getName(meta)] === true) {
                newMetadata.push(meta);
            }
        }
        Reflect.defineMetadata(ParamTypes, newMetadata, newConstructor);

        return <any>newConstructor;
    } else {
        return <any>constructor;
    }
}

/**
 * Decorate an object as Injectable into classes that are also decorated as Injectable
 * 
 * @export
 * @param {IInjectableOptions} [options={}] Options
 * @returns Decorator
 */
export function Injectable(options: IInjectableOptions = {}) {
    options = getOptions(options, defaultOptions);
    return function(constructor: Function) {
        InjectProvider.Instance.setName(<string>options.namespace, <any>constructor);

        if (options.inject === true) {
            constructor = Inject(options, constructor);
        }

        InjectProvider.Instance.register(<any>constructor);
        return <any>constructor;
    }
}

/**
 * Injectable options
 * 
 * @export
 * @interface IInjectableOptions
 * @property {string} namespace Namespace of the Injectable
 * @property {{[type: string]: boolean}} exclude Excluded namespaced types for injection, true to exclude
 * @property {boolean} inject Whether or not the class should have injectables injected into it
 */
export interface IInjectableOptions {
    namespace?: string;
    exclude?: {[type: string]: boolean};
    inject?: boolean;
}

const defaultOptions: IInjectableOptions = {
    namespace: '',
    exclude: {
        String: true,
        Number: true,
        Object: true,
        Array: true,
        Boolean: true
    },
    inject: true
}