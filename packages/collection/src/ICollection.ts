import { IQueryable } from "./collections/IQueryable";
import { IIterable } from "./collections/IIterable";
import { IGroup } from "./IGroup";

export interface ICollection<T> extends
IQueryable<T, ICollection<T>, ICollection<IGroup<any, T>>, ICollection<any>>,
IIterable<T, ICollection<T>>
{
    __extendnoop__(): void;
    readonly __instanceof__: boolean;
}