import { IPromise } from "./spec";
import { PromiseState } from "../promiseState";
import { warn, WARN_MULTIPLE_RESOLVE } from "../warn";

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

    constructor(executor: (resolve: (value: T) => void, reject: (reason: any) => void) => void) {
        this.__resolveExecutor(executor);
    }

    private __resolveExecutor(executor: (resolve: (value: T) => void, reject: (reason: any) => void) => void) {
        let done = false;
        try {
            executor(value => {
                if (done) return warn(WARN_MULTIPLE_RESOLVE);
                done = true;
                this.__resolve(value);
            }, reason => {
                if (done) return;
                done = true;
                this.__reject(reason);
            })
        } catch (err) {
            if (done) return;
            done = true;
            this.__reject(err);
        }
    }

    private __resolve<TResult = T>(value: TResult | PromiseLike<TResult>) {
        try {
            let then = getThen(value);
            if (then) {
                this.__resolveExecutor(then.bind(value));
                return;
            }
            this.__complete(PromiseState.fulfilled, value as any);
        } catch (err) {
            this.__reject(err);
        }
    }

    private __reject(reason: any) {
        try {
            let then = getThen(reason);
            if (then) {
                this.__resolveExecutor(then.bind(reason));
                return;
            }
            this.__complete(PromiseState.rejected, reason as any);
        } catch (err) {
            this.__reject(err);
        }
    }

    private __complete(state: PromiseState, value: T) {
        this.__state = state
        this.__value = value;
        for (let handler of this.__handlers) {
            this.__handle(handler);
        }
        //@ts-ignore - Ignore that handlers cannot be undefined
        this.__handlers = void 0;
    }

    private __handle(handler: Handler<T>) {
        if (this.state === PromiseState.pending) {
            this.__handlers.push(handler);
        } else if (this.state === PromiseState.fulfilled && typeof handler.onFulfilled === 'function') {
            handler.onFulfilled(this.value)
        } else if (this.state === PromiseState.rejected && typeof handler.onRejected === 'function') {
            handler.onRejected(this.value)
        }
    }

    private __chain(onFulfilled: ((value: T) => void) | null | undefined, onRejected: ((reason: any) => void) | null | undefined): void {
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
                        return reject(onRejected(reason));
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
}