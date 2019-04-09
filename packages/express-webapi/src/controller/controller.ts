import { Route } from "../route/route";
import { HttpMethod } from "../httpMethod";

export class Controller {
    constructor() { }

    BasePath?: string;
    Instance: any;
    Routes: {[key: string]: Route} = {};

    registerRoute(path: string, action: string, method: HttpMethod) {
        if (this.Routes[action] != null) {
            this.Routes[action].Path = path
        } else {
            this.Routes[action] = new Route(path, action, method);
        }
    }

    registerRouteMethod(action: string, method: HttpMethod) {
        if (this.Routes[action] != null) {
            this.Routes[action].Method = method
        } else {
            this.Routes[action] = new Route(action, action, method)
        }
    }
}