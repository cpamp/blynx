import { IPromise } from "./spec";
import { PromiseState } from "../promiseState";
import { schedule } from "../schedule";

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
    //#region private properties
    private __value: T | any;
    private __state: PromiseState = PromiseState.pending;
    private __handlers: Handler<T, any>[] = [];
    //#endregion

    constructor(executor: (resolve: (value?: T) => void, reject: (reason?: any) => void) => void) {
        this.__executor(executor);
    }

    //#region executor
    /**
     * Executes an executor and provides the resolve and reject functions.
     * @param executor Executor to execute
     */
    private __executor(executor: (resolve: (value?: T) => void, reject: (reason?: any) => void) => void) {
        var done = false;
        try {
            executor(value => {
                if (done) return;
                done = true;
                schedule(() => this.__complete(PromiseState.fulfilled, value as any));
            }, reason => {
                if (done) return;
                done = true;
                schedule(() => this.__complete(PromiseState.rejected, reason as any));
            })
        } catch (err) {
            if (done) return;
            done = true;
            schedule(() => this.__complete(PromiseState.rejected, err as any));
        }
    }

    /**
     * Completes a promise.
     * @param state State to set the promise to.
     * @param value Value to set the promise to.
     */
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

    /**
     * Handles a callback handler.
     * @param handler Handler to handle or stash for later evalution.
     */
    private __handle<TResult>(handler: Handler<T, TResult>) {
        if (this.__state === PromiseState.pending) {
            this.__handlers.push(handler);
        } else {
            let callback = this.__state === PromiseState.fulfilled ? handler.onFulfilled : handler.onRejected;
            let notFnCallback = this.__state === PromiseState.fulfilled ? handler.resolve : handler.reject;
            if (typeof callback === 'function') {
                try {
                    return handler.resolve(callback.call(void 0, this.__value) as any);
                } catch (err) {
                    return handler.reject(err);
                }
            } else {
                return notFnCallback(this.__value as any);
            }
        }
    }
    //#endregion

    //#region public api
    /**
     * Attaches callbacks for when the promise is fulfilled/rejected.
     * @param onFulfilled Callback to call when the promise is fulfilled.
     * @param onRejected Callback to call when the promise is rejected.
     */
    then<TResult1 = T, TResult2 = never>(onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2> {
        return new Promise<TResult1 | TResult2>((resolve, reject) => {
            return schedule(() => {
                this.__handle({ resolve, reject, onFulfilled, onRejected } as Handler<T, TResult1 | TResult2>)
            })
        })
    }

    /**
     * Attaches callback for when the promise is rejected.
     * @param onRejected Callback to call when the promise is rejected
     */
    catch<TResult = never>(onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult> {
        return this.then(null, onRejected);
    }

    /**
     * Always call a callback
     * @param callback Callback to always call.
     */
    finally(callback: () => void): Promise<T> {
        let onAny = (value: T) => {
            callback.call(void 0)
            return value;
        }
        return this.then(onAny, onAny);
    }
    //#endregion

    //#region toString
    //@ts-ignore
    readonly [Symbol.toStringTag]: "Promise";

    toString() {
        return "[object Promise]"
    }
    //#endregion

    //#region statics
    /**
     * Creates a resolved promise.
     * @param value Value to resolve the promise with.
     */
    static resolve<T>(value?: T) {
        return new Promise<T | undefined>(resolve => resolve(value));
    }

    /**
     * Creates a rejected promise.
     * @param reason Reason to reject the promise with.
     */
    static reject<T>(reason?: T) {
        return new Promise<T | undefined>((_resolve, reject) => reject(reason));
    }

    /**
     * Creates a deferred object containing a promise with it's resolve and reject functions.
     */
    static deferred<T = any>() {
        let resolve: (value?: T) => void = () => {};
        let reject: (reject?: any) => void = () => {};
        let promise = new Promise<T>((_resolve, _reject) => {
            resolve = _resolve;
            reject = _reject;
        })
        return { promise, resolve, reject }
    }
    //#endregion
}