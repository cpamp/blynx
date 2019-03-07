import { IQueryable } from "./collections/IQueryable";
import { IIterable } from "./collections/IIterable";
import { IGroup } from "./IGroup";
import { ICollectionOptions } from "./ICollectionOptions";

export interface ICollection<T> extends
IQueryable<T, ICollection<T>, ICollection<IGroup<any, T>>, ICollection<any>>,
IIterable<T, ICollection<T>>
{
    /**
     * A function that does nothing, used to test for inheritance.
     */
    inheritancenoop(): void;

    /**
     * Whether or not `this instanceof Collection === true`
     */
    readonly instanceof: boolean;

    /**
     * The options for the collection.
     */
    readonly options: ICollectionOptions;
}