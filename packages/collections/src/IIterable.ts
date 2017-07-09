import { IIterator } from "./IIterator";

export interface IIterable<T = {}> {
    [key: number]: T;
    [Symbol.iterator](): IIterator<T>;
}