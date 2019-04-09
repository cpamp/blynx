import { HttpMethod } from "../httpMethod";

export class Route {
    constructor(path: string, action: string, method: HttpMethod) {
        this.Method = method;
        this.Path = path;
        this.Action = action;
    }

    Key?: number;
    Method: HttpMethod;
    Path: string;
    Action: string;
}