import { ICollectionOptions } from "./collectionOptions";

export interface ICollectionSpec {
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