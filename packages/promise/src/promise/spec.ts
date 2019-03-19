export interface IPromise<T> extends Promise<T> {
    finally(callback: Function): PromiseLike<T>;
}