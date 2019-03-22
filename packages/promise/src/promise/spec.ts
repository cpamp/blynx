export interface IPromise<T> extends Promise<T> {
    /**
     * Attaches a callback for the resolution and rejection of a promise.
     * @param callback Callback to always call.
     */
    finally(callback: () => void): PromiseLike<T>;

    /**
     * 
     * @param this Promise that has resolved to an array.
     * @param onFulfilled Callback to call on each value in the array.
     * @param onRejected Callback to call on rejected values in the array.
     */
    map<TItem = any, TResult1 = TItem[], TResult2 = never>(this: Promise<Array<TItem>>, onFulfilled?: ((value: TItem) => TResult1 | PromiseLike<TResult1>) | null | undefined, onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1[] | TResult2[]>
}