import { HttpMethod } from "../httpMethod";
import { Router } from "../router";

export function Route(path: string, method: HttpMethod = HttpMethod.GET) {
    return function (target: any, propertyKey: string) {
        Router.instance.registerRoute(target, path, propertyKey, method);
    };
}