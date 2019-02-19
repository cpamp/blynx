import { ICollection } from "./ICollection";

export interface IGroup<TKey, TItem> extends ICollection<TItem>{
    key: TKey;
}