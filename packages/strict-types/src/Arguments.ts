import { IFunction } from "./IFunction";

export class ArgumentsType {
    constructor(public value: IFunction) {}
}

export function Arguments(type: IFunction): IFunction {
    return <any>(new ArgumentsType(type));
}