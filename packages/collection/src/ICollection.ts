import { IQueryable } from "./collections/IQueryable";
import { IIterable } from "./collections/IIterable";
import { ICollectionOptions } from "./ICollectionOptions";

export interface ICollection<T> extends
IQueryable<T, any>,
IIterable<T, any>
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