import { Controller } from "./controller/controller";
import { HttpMethod } from "./httpMethod";
var Symbol = require('es6-symbol');

/**
 * A type that we can instantiate. Returns T
 */
export type NewableType<T> = {new(...args: any[]): T}

let keyCount: number = 0;
const SYMBOL_ID = Symbol('Id');

export class Router {
    private static _instance: Router;

    private controllers: {[key: number]: Controller} = {};

    private constructor() { }

    /**
     * Instance of Router
     * 
     * @readonly
     * @static
     * @type {Router}
     * @memberOf Router
     */
    public static get instance(): Router {
        return this._instance || (this._instance = new this());
    }

    public getControllers() {
        return this.controllers;
    }

    private getKey() {
        return ++keyCount;
    }

    private getControllerKey(targetPrototype: any): number {
        return targetPrototype[SYMBOL_ID] = (targetPrototype[SYMBOL_ID] || this.getKey());
    }

    private getController(prototype: any) {
        let key = this.getControllerKey(prototype)
        return this.controllers[key] || (this.controllers[key] = new Controller())
    }

    public registerController<T extends Function>(instanceType: NewableType<T>, basePath?: string) {
        let key = this.getControllerKey(instanceType.prototype)
        if (this.controllers[key] != null) {
            let controller = this.controllers[key];
            controller.BasePath = basePath;
            controller.Instance = new (instanceType)();
        }
    }

    public registerRoute(targetPrototype: any, path: string, actionKey: string, method: HttpMethod) {
        this.getController(targetPrototype).registerRoute(path, actionKey, method);
    }

    public registerRouteMethod(targetPrototype: any, action: string, method: HttpMethod) {
        this.getController(targetPrototype).registerRouteMethod(action, method)
    }
}