import { IFunction } from "./IFunction";

export class NullableType {
    constructor(public value: IFunction) {}
}

export function Nullable(type: IFunction): IFunction {
    return <any>(new NullableType(type));
}