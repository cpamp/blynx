export interface IPromise<T> extends Promise<T> {
    /**
     * Attaches a callback for the resolution and rejection of a promise.
     * @param callback Callback to always call.
     */
    finally(callback: () => void): PromiseLike<T>;
}