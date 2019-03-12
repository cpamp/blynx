import { Func } from "../../func";
import { ValueItem } from "../../ValueItem";

export interface IIterable<T, TSelf extends IIterable<any> = IIterable<any, any>> extends Array<T> {
        /**
     * Determines if all items of a collection satisfy a condition.
     * @param this The collection being tested.
     * @param predicate A function that will test all items for a condition.
     */
    all(this: TSelf, predicate: Func<[T], boolean>): boolean;

    /**
     * Determines if a collection has any items.
     * @param this The collection being tested.
     */
    any(this: TSelf): boolean;

    /**
     * Determines if any items of a collection satisfy a condition.
     * @param this The collection being tested.
     * @param predicate Function that will test items for a condition.
     */
    any(this: TSelf, predicate: Func<[T], boolean>): boolean;

    /**
     * Determines the average of a collection of numbers.
     * @param this The collection of numbers being averaged.
     */
    average(this: IterableSpec<number>): number;

    /**
     * Determines the average of a collection of items.
     * @param this The collection of items being averaged.
     * @param selector A function that will select the value to be averaged.
     */
    average(this: TSelf, selector: Func<[T], number>): number;

    /**
     * Shallow clones a collection and preserves empty indices.
     * @param this The collection being cloned.
     */
    clone(this: TSelf): TSelf;

    /**
     * Determines if an item exists in a collection.
     * @param this The collection being searched.
     * @param item An item to search the collection for.
     */
    contains(this: TSelf, item: T): boolean;

    /**
     * Shallow copies a collection and does not preserve empty indices.
     * @param this The collection being copied.
     */
    copy(this: TSelf): TSelf;

    /**
     * Determines the number of items in a collection.
     * @param this The collection being counted.
     */
    count(this: TSelf): number;

    /**
     * Determines how many items in a collection satisfy a condition.
     * @param this The collection being counted.
     * @param predicate A function that will test items for a condition.
     */
    count(this: TSelf, predicate: Func<[T], boolean>): number;

    /**
     * Determines if two collections are identical.
     * @param this The collection being tested for equality.
     * @param collection The collection to test against for equality.
     */
    equals(this: TSelf, collection: IterableSpec<T>): boolean;

    /**
     * Determines if two collections are identical.
     * @param this The collection being tested for equality.
     * @param collection The collection to test against for equality.
     * @param comparer A function that will test items for equality.
     */
    equals(this: TSelf, collection: IterableSpec<T>, comparer: Func<[T, T], boolean>): boolean;

    /**
     * Inserts an item into the collection.
     * @param this The collection to insert into.
     * @param index The index for the newly inserted item to have.
     * @param item An item to insert into the collection.
     */
    insert(this: TSelf, index: number, item: T): void;

    /**
     * Determines the maximum value of a collection of numbers.
     * @param this The collection of numbers.
     * @param defaultValue The default value if the collection is empty. Throws InvalidOperationError if not provided and empty.
     */
    max(this: IterableSpec<number>, defaultValue?: number): number;

    /**
     * Determines the item and value with the maximum result from the selector.
     * @param this The collection used to find the maximum value.
     * @param selector A function that selects the number to compare.
     * @param defaultValue The default value if the collection is empty. Throws InvalidOperationError if not provided and empty.
     */
    max(this: TSelf, selector: Func<[T], number>, defaultValue?: ValueItem<number, T>): ValueItem<number, T>

    /**
     * Determines the minimum value of a collection of numbers.
     * @param this The collection of numbers.
     * @param defaultValue The default value if the collection is empty. Throws if not provided and empty.
     */
    min(this: IterableSpec<number>, defaultValue?: number): number;

    /**
     * Determines the item and value with the minimum result from the selector.
     * @param this The collection used to find the minimum value.
     * @param selector A function that selects the number to compare.
     * @param defaultValue The default value if the collection is empty. Throws if not provided and empty.
     */
    min(this: TSelf, selector: Func<[T], number>, defaultValue?: ValueItem<number, T>): ValueItem<number, T>;

    /**
     * Adds an item to the beginning of a collection.
     * @param this The collection to add to.
     * @param item An item to add to the collection.
     */
    prepend(this: TSelf, item: T): void;

    /**
     * Removes all instances of the item from the collection.
     * @param this The collection to remove from.
     * @param item An item to remove from the collection.
     */
    remove(this: TSelf, item: T): TSelf;

    /**
     * Removes all items that satisfy the predicate from the collection.
     * @param this The collection to remove from.
     * @param predicate A function to test if an item should be removed.
     */
    remove(this: TSelf, predicate: Func<[T], boolean>): TSelf;

    /**
     * Removes the item at the specified index.
     * @param this The collection to remove from.
     * @param index The index of the item to be removed.
     */
    removeAt(this: TSelf, index: number): T;

    /**
     * Determines the sum of the numbers in the collection.
     * @param this The collection of numbers.
     */
    sum(this: IterableSpec<number>): number;

    /**
     * Determines the sum of the selectors.
     * @param this The collection to calculate the sum of.
     * @param selector A function used to select the number used in the sum.
     */
    sum(this: TSelf, selector: Func<[T], number>): number;
}