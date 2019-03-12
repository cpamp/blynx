import { IIterableSpec } from "./spec";

export interface IIterable<T, TSelf extends IIterable<any> = IIterable<any, any>> extends Array<T>, IIterableSpec<T, TSelf> { }