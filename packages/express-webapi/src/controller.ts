import { Route } from "./route";

export class Controller {
    constructor() { }

    BasePath?: string;
    Instance: any;
    Routes: Route[] = [];

    addRoute(route: Route) {
        this.Routes.push(route);
    }
}