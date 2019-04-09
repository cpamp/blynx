import "reflect-metadata";
import { Router } from "../router";

export function Controller(basePath?: string) {
    return function(constructor: Function) {
        Router.instance.registerController(<any>constructor, basePath);
    }
}