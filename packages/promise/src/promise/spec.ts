export interface IPromise<T> extends Promise<T> {
    /**
     * The promise that created this promise.
     */
    parent: Promise<any> | undefined;

    /**
     * The promises that were created by this promise.
     */
    children: Promise<any>[]

    /**
     * Attaches a callback for the resolution and rejection of a promise.
     * @param callback Callback to always call.
     */
    finally(callback: () => void): PromiseLike<T>;

    /**
     * Creates a promise that resolves to an array, which is the outcome of each item applied to the callback.
     * @param this Promise that has resolved to an array.
     * @param onFulfilled Callback to call on each value in the array.
     * @param onRejected Callback to call on rejected values in the array.
     */
    map<TItem, TResult1 = T, TResult2 = never>(this: Promise<Array<TItem>>, onFulfilled?: ((value: TItem) => TResult1 | PromiseLike<TResult1>) | null | undefined, onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): PromiseLike<TResult1[] | TResult2[]>

    /**
     * Creates a promise that resolves after the timeout period.
     * @param ms Miliseconds to timeout for.
     */
    timeout(ms?: number): PromiseLike<T>;
}