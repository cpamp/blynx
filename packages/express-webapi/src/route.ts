import { HttpMethod } from "./httpMethod";

export class Route {
    constructor(method: HttpMethod, path: string, action: string) {
        this.Method = method;
        this.Path = path;
        this.Action = action;
    }

    Method: HttpMethod;
    Path: string;
    Action: string;
}