import "reflect-metadata";
import { Router } from "./router";

export function Controller() {
    return function(constructor: Function) {
        Router.instance.registerController((<any>constructor));
    }
}