import { Func } from "../../func";

export interface IQueryableSpec<T, TSelf extends IQueryableSpec<any> = IQueryableSpec<any, any>> {
    /**
     * Creates a collection of distinct items.
     * @param this The collection to get distinct items from.
     */
    distinct(this: TSelf): TSelf;

    /**
     * Creates a collection of distinct items.
     * @param this The collection to get distinct items from.
     * @param comparer A function to test for equality.
     */
    distinct(this: TSelf, comparer: Func<[T, T], boolean>): TSelf;

    /**
     * Provides the first item of the collection.
     * @param this The collection to get the first item from.
     * @param defaultValue Default value to return if the collection is empty. Throws if not provided and empty.
     */
    first(this: TSelf, defaultValue?: T): T;

    /**
     * Provides the first item of the collection that satisfies the predicate.
     * @param this The collection to get the first item from.
     * @param predicate A function to determine the first item.
     * @param defaultValue Default value to return if the collection is empty, or no items satisfy the predicate. Throws if not provided and empty or unsatisfied.
     */
    first(this: TSelf, predicate: Func<[T], boolean>, defaultValue?: T): T;

    /**
     * Creates a collection of grouped items.
     * @param this The collection to group.
     * @param selector A function to select the key to group by. 
     */
    groupBy<TKey>(this: TSelf, selector: Func<[T], TKey>): TSelf;

    /**
     * Creates a collection of grouped items.
     * @param this The collection to group.
     * @param selector A function to select the key to group by.
     * @param comparer A function to compare the equality of keys.
     */
    groupBy<TKey>(this: TSelf, selector: Func<[T], TKey>, comparer: Func<[TKey, TKey], boolean>): TSelf;

    /**
     * Creates a new string by concatenating all of the items in an array.
     * @param this The collection of strings to join
     * @param separator A string to separate each item in the array.
     */
    join(this: TSelf, separator?: string | undefined): string;

    /**
     * Creates a collection of joined items.
     * @param this The collection to join.
     * @param inner A collection to join.
     * @param outerKeySelector A function to select the key for the outer collection.
     * @param innerKeySelector A function to select the key for the inner collection.
     * @param resultSelector A function to select the result of the joined items.
     */
    join<TInner, TKey, TResult>(this: TSelf, inner: IQueryableSpec<TInner>, outerKeySelector: Func<[T], TKey>, innerKeySelector: Func<[TInner], TKey>, resultSelector: Func<[T, TInner], TResult>): TResult;

    /**
     * Creates a collection of joined items.
     * @param this The collection to join.
     * @param inner A collection to join.
     * @param outerKeySelector A function to select the key for the outer collection.
     * @param innerKeySelector A function to select the key for the inner collection.
     * @param resultSelector A function to select the result of the joined items.
     * @param comparer A function that compares the keys for equality.
     */
    join<TInner, TKey, TResult>(this: TSelf, inner: IQueryableSpec<TInner>, outerKeySelector: Func<[T], TKey>, innerKeySelector: Func<[TInner], TKey>, resultSelector: Func<[T, TInner], TResult>, comparer: Func<[TKey, TKey], boolean>): TResult;

    /**
     * Provides the last item of the collection.
     * @param this The collection to get the last item of.
     * @param defaultValue The default value to return if the collection is empty. Throws if not provided and empty.
     */
    last(this: TSelf, defaultValue?: T): T;

    /**
     * Provides the last item of the collection that satisfies the predicate.
     * @param this The collection to get the last item of.
     * @param predicate A function to determine the last item.
     * @param defaultValue The default value to return if the collection is empty, or no items satify the predicate. Throws if not provided and empty or unsatisfied.
     */
    last(this: TSelf, predicate: Func<[T], boolean>, defaultValue: T): T;

    /**
     * Creates an ascending ordered collection.
     * @param this The collection to order.
     * @param selector A function to select the property to order by.
     */
    orderBy<TOrderBy>(this: TSelf, selector: Func<[T], TOrderBy>): TSelf;

    /**
     * Creates an descending ordered collection.
     * @param this The collection to order.
     * @param selector A function to select the property to order by.
     */
    orderByDesc<TOrderBy>(this: TSelf, selector: Func<[T], TOrderBy>): TSelf;

    /**
     * Creates a collection that consists of the first n items.
     * @param this The collection to limit.
     * @param n The number of items to limit the collection to.
     */
    limit(this: TSelf, n: number): TSelf;

    /**
     * Creates a collection of the selected items.
     * @param this The collection to select from.
     * @param selector A function to select items for the new collection.
     */
    select<TReturn>(this: TSelf, selector: Func<[T], TReturn>): TSelf;

    /**
     * Creates a collection consisting of the remainining items.
     * @param this The collection to skip items.
     * @param n The number of items to skip.
     */
    skip(this: TSelf, n: number): TSelf;

    /**
     * Creates a unioned collection.
     * @param this The collection to be unioned.
     * @param collection A collection to be unioned.
     */
    union(this: TSelf, collection: IQueryableSpec<T>): TSelf;

    /**
     * Created a unioned collection.
     * @param this The collection to be unioned.
     * @param collection A collection to be unioned.
     * @param comparer A function used to test equality of items.
     */
    union(this: TSelf, collection: IQueryableSpec<T>, comparer: Func<[T, T], boolean>): TSelf;

    /**
     * Creates a collection consisting of items that satisfy the predicate.
     * @param this The collection to reduce.
     * @param predicate A function to determine if an item should remain.
     */
    where(this: TSelf, predicate: Func<[T], boolean>): TSelf;
}