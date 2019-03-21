import { IPromise } from "./spec";
import { PromiseState } from "../promiseState";

interface Handler<T, TResult> {
    resolve: (value?: T) => void;
    reject: (reason?: any) => void
    onFulfilled?: ((value: T) => TResult | PromiseLike<TResult>) | null | undefined;
    onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined;
    onFinally?: () => Promise<T> | PromiseLike<T>;
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

    private __state: PromiseState = PromiseState.pending;

    //private __done: boolean = false;

    private __handlers: Handler<T, any>[] = [];

    constructor(executor: (resolve: (value?: T) => void, reject: (reason?: any) => void) => void) {
        this.__executor(executor);
    }

    private __executor(executor: (resolve: (value?: T) => void, reject: (reason?: any) => void) => void) {
        var done = false;
        try {
            executor(value => {
                if (done) return;
                done = true;
                setTimeout(() => this.__complete(PromiseState.fulfilled, value as any), 0);
            }, reason => {
                if (done) return;
                done = true;
                setTimeout(() => this.__complete(PromiseState.rejected, reason as any), 0);
            })
        } catch (err) {
            if (done) return;
            done = true;
            setTimeout(() => this.__complete(PromiseState.rejected, err as any), 0);
        }
    }

    // private __resolveExecutor(value?: T) {
    //     if (this.__done) return;
    //     this.__done = true;
    //     setTimeout(() => this.__complete(PromiseState.fulfilled, value as any), 0);
    // }

    // private __rejectExecutor(reason?: any) {
    //     if (this.__done) return;
    //     this.__done = true;
    //     setTimeout(() => this.__complete(PromiseState.rejected, reason as any), 0);
    // }

    private __complete(state: PromiseState, value: T) {
        try {
            if (this === (value as any)) throw new TypeError('Promise and value refer to the same object')
            
            let then: Function | null;
            if (state === PromiseState.fulfilled && (then = getThen(value))) {
                this.__executor(then.bind(value));
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
            this.__complete(PromiseState.rejected, err as any);
        }
    }

    private __handle<TResult>(handler: Handler<T, TResult>) {
        if (this.__state === PromiseState.pending) {
            this.__handlers.push(handler);
        } else if (this.__state === PromiseState.fulfilled) {
            this.__fulfill(handler, this.__value)
        } else if (this.__state === PromiseState.rejected) {
            this.__reject(handler, this.__value)
        }
    }

    private __fulfill<TResult>(handler: Handler<T, TResult>, value: T): void {
        if (typeof handler.onFulfilled === 'function') {
            try {
                return handler.resolve(handler.onFulfilled.call(void 0, value) as any);
            } catch (err) {
                return handler.reject(err);
            }
        } else {
            return handler.resolve(value as any);
        }
    }

    private __reject<TResult>(handler: Handler<T, TResult>, reason: T): void {
        if (typeof handler.onRejected === 'function') {
            try {
                return handler.resolve(handler.onRejected.call(void 0, reason) as any);
            } catch (err) {
                return handler.reject(err);
            }
        } else {
            return handler.reject(reason);
        }
    }

    then<TResult1 = T, TResult2 = never>(onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2> {
        return new Promise<TResult1 | TResult2>((resolve, reject) => {
            return setTimeout(() => {
                this.__handle({ resolve, reject, onFulfilled, onRejected } as Handler<T, TResult1 | TResult2>)
            }, 0)
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