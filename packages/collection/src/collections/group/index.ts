import { Collection } from "../Collection";

export interface IGroup<TKey, TItem> extends Array<TItem> {
    key: TKey;
}

export class Group<TKey, TItem> extends Collection<TItem> implements IGroup<TKey, TItem> {
    key: TKey;
    constructor(key: TKey, ...args: any[]) {
        super(...args);
        this.key = key;
    }
}