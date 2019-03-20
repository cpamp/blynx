import { IPromise } from "./spec";
import { PromiseState } from "../promiseState";

interface Handler<T> {
    onFulfilled: <TResult>(value: T) => TResult | PromiseLike<TResult>;
    onRejected: <TResult>(value: T) => TResult | PromiseLike<TResult>;
    onFinally: () => Promise<T> | PromiseLike<T>;
}

function getThen(value: any): Function | null {
    var t = typeof value;
    if (value && (t === 'object' || t === 'function')) {
        var then = value.then;
        if (typeof then === 'function') {
            return then;
        }
    }
    return null;
}

export class Promise<T> implements IPromise<T> {
    private __value: T | any;
    get value() {
        return this.__value;
    }

    private __state: PromiseState = PromiseState.pending;
    get state() {
        return this.__state;
    }

    private __handlers: Handler<T>[] = [];

    constructor(executor: (resolve: (value?: T) => void, reject: (reason?: any) => void) => void) {
        this.__resolveExecutor(executor);
    }

    private __resolveExecutor(executor: (resolve: (value?: T) => void, reject: (reason?: any) => void) => void) {
        let done = false;
        try {
            executor(value => {
                if (done) return;
                done = true;
                setTimeout(() => this.__resolve(value), 0);
            }, reason => {
                if (done) return;
                done = true;
                setTimeout(() => this.__reject(reason), 0);
            })
        } catch (err) {
            if (done) return;
            done = true;
            setTimeout(() => this.__reject(err), 0);
        }
    }

    private __resolve<TResult = T>(value: TResult | PromiseLike<TResult>) {
        this.__complete(PromiseState.fulfilled, value as any)
    }

    private __reject(reason: any) {
        this.__complete(PromiseState.rejected, reason as any);
    }

    private __complete(state: PromiseState, value: T) {
        try {
            if (this === (value as any)) throw new TypeError('Promise and value refer to the same object')
            
            let then: Function | null;
            if (state === PromiseState.fulfilled && (then = getThen(value))) {
                this.__resolveExecutor(then.bind(value));
            } else {
                this.__state = state
                this.__value = value;
                for (let handler of this.__handlers) {
                    this.__handle(handler);
                }
                //@ts-ignore - Ignore that handlers cannot be undefined
                this.__handlers = void 0;
            }
        } catch (err) {
            this.__reject(err);
        }
    }

    private __handle(handler: Handler<T>) {
        if (this.state === PromiseState.pending) {
            this.__handlers.push(handler);
        } else if (this.state === PromiseState.fulfilled) {
            handler.onFulfilled(this.value)
        } else if (this.state === PromiseState.rejected) {
            handler.onRejected(this.value)
        }
    }

    private __chain(onFulfilled: (value: T) => void, onRejected: (reason: any) => void): void {
        setTimeout(() => {
            this.__handle({
                onFulfilled: onFulfilled,
                onRejected: onRejected
            } as Handler<T>)
        }, 0)
    }

    then<TResult1 = T, TResult2 = never>(onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2> {
        return new Promise<TResult1 | TResult2>((resolve, reject) => {
            return this.__chain(value => {
                if (typeof onFulfilled === 'function') {
                    try {
                        return resolve(onFulfilled(value) as any);
                    } catch (err) {
                        return reject(err);
                    }
                } else {
                    return resolve(value as any);
                }
            }, reason => {
                if (typeof onRejected === 'function') {
                    try {
                        return resolve(onRejected(reason) as any);
                    } catch (err) {
                        return reject(err);
                    }
                } else {
                    return reject(reason);
                }
            })
        })
    }

    //@ts-ignore - Method not implemented.
    catch<TResult = never>(onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult> {
        throw new Error("Method not implemented.");
    }

    //@ts-ignore - Method not implemented.
    finally(callback: Function): Promise<T> {
        throw new Error("Method not implemented.");
    }

    //@ts-ignore
    readonly [Symbol.toStringTag]: "Promise";

    toString() {
        return "[object Promise]"
    }

    static resolve<T>(value?: T) {
        return new Promise<T | undefined>(resolve => resolve(value));
    }

    static reject<T>(reason?: T) {
        return new Promise<T | undefined>((_resolve, reject) => reject(reason));
    }

    static deferred<T = any>() {
        let resolve: (value?: T) => void = () => {};
        let reject: (reject?: any) => void = () => {};
        let promise = new Promise<T>((_resolve, _reject) => {
            resolve = _resolve;
            reject = _reject;
        })
        return { promise, resolve, reject }
    }
}