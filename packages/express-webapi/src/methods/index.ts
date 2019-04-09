import { HttpMethod } from "../httpMethod";
import { Router } from "../router";

export function Delete(target: any, propertyKey: string) {
    Router.instance.registerRouteMethod(target, propertyKey, HttpMethod.DELETE);
}

export function Get (target: any, propertyKey: string) {
    Router.instance.registerRouteMethod(target, propertyKey, HttpMethod.GET);
}

export function Patch(target: any, propertyKey: string) {
    Router.instance.registerRouteMethod(target, propertyKey, HttpMethod.PATCH);
}

export function Post(target: any, propertyKey: string) {
    Router.instance.registerRouteMethod(target, propertyKey, HttpMethod.POST);
}

export function Put(target: any, propertyKey: string) {
    Router.instance.registerRouteMethod(target, propertyKey, HttpMethod.PUT);
}