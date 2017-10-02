import {Express} from "express";
import { Router } from "./router";
import { Route } from "./route";
import { Controller } from "./controller";
import { HttpMethod } from "./httpMethod";


export abstract class WebApi {
    static start(app: Express) {
        let controllers = Router.instance.getControllers();
        for (let key in controllers) {
            if (controllers.hasOwnProperty(key)) {
                this.bindController(app, controllers[key]);
            }
        }
    }

    private static bindController(app: Express, controller: Controller) {
        for (let route of controller.Routes) {
            this.bindRoute(app, route, controller);
        }
    }

    private static bindRoute(app: Express, route: Route, controller: Controller) {
        let action = HttpMethod[route.Method].toLowerCase();
        let path = (controller.BasePath || '') + route.Path;
        if (path.lastIndexOf('/', 0) !== 0) path = `/${path}`;
        if (path.lastIndexOf('/') === path.length - 1) path = path.slice(0, -1);
        (<any>app)[action](path, controller.Instance[route.Action]);
    }
}