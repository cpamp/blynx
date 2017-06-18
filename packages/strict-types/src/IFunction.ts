export type IFunction = (new (...args: any[]) => any);

export interface IHasName extends IFunction{
    name: string;
}

export interface IHasConstructor extends IFunction {
    constructor: IHasName;
}