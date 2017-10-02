import { HttpMethod } from "./httpMethod";
import { Router } from "./router";

export function Route(httpMethod: HttpMethod, path: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Router.instance.registerRoute(target, httpMethod, path, propertyKey);
    };
}