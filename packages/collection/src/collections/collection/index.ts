import { Func } from "../../func";
import { InvalidOperationError, errorMessages } from "../../errors";
import { IGroup } from "../group";
import { IQueryable } from "../queryable";
import { ValueItem } from "../../ValueItem";
import { IIterable } from "../iterable";
import { isCollectionOptions, setDefaultOptions } from "./collectionOptions";

const instanceType = '@blynx/collection';
const instanceTypeSymbol: any = typeof Symbol === 'function' ? (<any>Symbol)() : '__instancetype__';

function firstLast<T>(this: Collection<T>, predicate: any, defaultValue: any, hasPredicateFn: Func<[Function, any], { found: boolean, value: any }>, hasNoPredicateFn: Func<[void], any>) {
    if (typeof predicate !== 'function' && typeof defaultValue === 'undefined') defaultValue = predicate;
    if (this.length === 0 && typeof defaultValue === 'undefined') throw new InvalidOperationError(errorMessages.noItems);
    if (this.length === 0) return defaultValue;
    if (typeof predicate === 'function') {
        let result = hasPredicateFn(predicate, defaultValue);
        if (typeof defaultValue === 'undefined' && result.found === false) throw new InvalidOperationError(errorMessages.notFound);
        return result.value;
    } else {
        return hasNoPredicateFn();
    }
}

function orderByBase<T>(this: Collection<T>, selector: Func<[T], any>, desc: boolean = false) {
    var result = this.copy();
    result.sort((a: any, b: any) => {
        a = selector(a);
        b = selector(b);
        let result = 0;
        if (a < b) result = -1;
        if (a > b) result = 1;
        return result * (desc ? -1 : 1);
    });
    return result;
}

function minMax<T>(this: Collection<T>, selector: any | undefined, defaultValue: any | undefined, comparer: Func<[number, number], boolean>, starter: number) {
    let returnValueItem = false;
    if (typeof selector === 'number') {
        defaultValue = selector;
        selector = void 0;
    }
    if (typeof selector === 'function') {
        returnValueItem = true;
    } else if (typeof selector === 'undefined') {
        selector = (item: number): number => item;
    }
    if (typeof defaultValue === 'undefined' && this.length === 0) throw new InvalidOperationError(errorMessages.noItems);
    if (this.length === 0) return defaultValue;

    let minMax = starter;
    let maxItem;
    for (let item of this) {
        let current = selector(item);
        if (comparer(current, minMax)) {
            minMax = current;
            maxItem = item;
        }
    }
    return returnValueItem ? { value: minMax, item: maxItem } : minMax;
}

export interface ICollectionOptions {
    allowSetPrototypeOf?: boolean;
}

export interface ICollection {
    /**
     * A function that does nothing, used to test for inheritance.
     */
    inheritancenoop(): void;
    /**
     * Whether or not `this instanceof Collection === true`
     */
    readonly instanceof: boolean;
    /**
     * The options for the collection.
     */
    readonly options: ICollectionOptions;
}

export class Collection<T> extends Array<T> implements ICollection, IIterable<T>, IQueryable<T> {
    constructor(length: number)
    constructor(options: ICollectionOptions)
    constructor(options: ICollectionOptions, ...args: T[])
    constructor(options: ICollectionOptions, length: number)
    constructor(...args: T[])
    constructor(...args: any[]) {
        let hasOptions = args.length > 0 && isCollectionOptions(args[0]);
        let options = hasOptions ? setDefaultOptions(args[0]) : setDefaultOptions({});
        if (hasOptions) {
            args.splice(0, 1);
        }

        let $this = super(...args);
        Object.defineProperty(this, 'options', {
            value: options,
            writable: false,
            enumerable: false,
            configurable: false
        });
        Object.defineProperty(this, 'instanceof', {
            value: true,
            writable: false,
            enumerable: false,
            configurable: false
        });
        Object.defineProperty(this, instanceTypeSymbol, {
            value: instanceType,
            writable: false,
            enumerable: false,
            configurable: false
        });
        if (typeof this.inheritancenoop !== 'function') {
            if (typeof (<any>Object).setPrototypeOf === 'function' && options.allowSetPrototypeOf) {
                (<any>Object).setPrototypeOf(this, Collection.prototype);
            } else {
                this.instanceof = false;
                for (let key in Collection.prototype) {
                    if (this.hasOwnProperty(key)) {
                        Object.defineProperty($this, key, {
                            value: function () { return Collection.prototype[key].apply($this, arguments); },
                            writable: false,
                            enumerable: false,
                            configurable: false
                        });
                    }
                }
            }
        }
    }

    inheritancenoop() { }
    //@ts-ignore This property is defined in the constructor via Object.defineProperty
    readonly instanceof: boolean;
    //@ts-ignore This property is defined in the constructor via Object.defineProperty
    readonly options: ICollectionOptions;

    static isCollection(obj: any) {
        return obj instanceof Collection || obj[instanceTypeSymbol] === instanceType;
    }

    //#region IQueryable
    distinct(this: Collection<T>): Collection<T>;
    distinct(this: Collection<T>, comparer: Func<[T, T], boolean>): Collection<T>;
    distinct(this: Collection<T>, comparer?: any) {
        if (typeof comparer === 'undefined') comparer = (a: T, b: T) => a === b;

        let result = new Collection<T>(this.options);
        for (let item of this) {
            let found = false;
            for (let rItem of result) {
                if (comparer(item, rItem) === true) {
                    found = true;
                    break;
                }
            }
            if (found === false || result.length === 0) result.push(item);
        }
        return result;
    }

    first(this: Collection<T>, defaultValue?: T | undefined): T;
    first(this: Collection<T>, predicate: Func<[T], boolean>, defaultValue?: T | undefined): T;
    first(this: Collection<T>, predicate?: any, defaultValue?: any) {
        return firstLast.call(this, predicate, defaultValue, (predicate: any, defaultValue: any) => {
            for (let item of this) {
                if ((<any>predicate)(item)) return { found: true, value: item };
            }
            return { found: false, value: defaultValue };
        }, () => this[0]);
    }

    groupBy<TKey>(this: Collection<T>, selector: Func<[T], TKey>): Collection<IGroup<TKey, T>>;
    groupBy<TKey>(this: Collection<T>, selector: Func<[T], TKey>, comparer: Func<[TKey, TKey], boolean>): Collection<IGroup<TKey, T>>;
    groupBy<TKey>(this: Collection<T>, selector: any, comparer?: any): Collection<IGroup<TKey, T>> {
        if (typeof comparer === 'undefined') comparer = (a: any, b: any) => a === b;

        let result = new Collection<IGroup<any, T>>(this.options);
        for (let item of this) {
            let found = false;
            for (let rItem of result) {
                if (comparer(selector(item), rItem.key)) {
                    rItem.push(item);
                    found = true;
                    break;
                }
            }
            if (found === false) {
                let group = new Group<any, T>(selector(item), this.options);
                group.push(item);
                result.push(group);
            }
        }
        return result;
    }

    join(this: Collection<T>, separator?: string | undefined): string;
    join<TInner, TKey, TResult>(this: Collection<T>, inner: IQueryable<TInner>, outerKeySelector: Func<[T], TKey>, innerKeySelector: Func<[TInner], TKey>, resultSelector: Func<[T, TInner], TResult>): TResult;
    join<TInner, TKey, TResult>(this: Collection<T>, inner: IQueryable<TInner>, outerKeySelector: Func<[T], TKey>, innerKeySelector: Func<[TInner], TKey>, resultSelector: Func<[T, TInner], TResult>, comparer: Func<[TKey, TKey], boolean>): TResult;
    join(this: Collection<T>, inner?: any, outerKeySelector?: any, innerKeySelector?: any, resultSelector?: any, comparer?: any) {
        if (arguments.length <= 1) return super.join(inner);
        if (typeof comparer === 'undefined') comparer = (a: any, b: any) => a === b;

        let result = new Collection(this.options);
        for (let outerItem of this) {
            for (let innerItem of inner) {
                if (comparer(outerKeySelector(outerItem), innerKeySelector(innerItem))) {
                    result.push(resultSelector(outerItem, innerItem));
                }
            }
        }
        return result;
    }

    last(this: Collection<T>, defaultValue?: T): T;
    last(this: Collection<T>, predicate: Func<[T], boolean>, defaultValue?: T): T;
    last(this: Collection<T>, predicate: any, defaultValue?: any) {
        return firstLast.call(this, predicate, defaultValue, (predicate: any, defaultValue: any) => {
            for (let i = this.length - 1; i >= 0; i--) {
                if ((<any>predicate)(this[i])) return { found: true, value: this[i] };
            }
            return { found: false, value: defaultValue };
        }, () => this[this.length - 1]);
    }

    orderBy<TOrderBy>(this: Collection<T>, selector: Func<[T], TOrderBy>): Collection<T>;
    orderBy(this: Collection<T>, selector: any) {
        return orderByBase.call(this, selector);
    }

    orderByDesc<TOrderBy>(this: Collection<T>, selector: Func<[T], TOrderBy>): Collection<T>;
    orderByDesc(this: Collection<T>, selector: any) {
        return orderByBase.call(this, selector, true)
    }

    limit(this: Collection<T>, n: number): Collection<T>;
    limit(this: Collection<T>, n: number) {
        if (n <= 0) return new Collection<T>(this.options);
        let result = this.copy();
        if (n >= this.length) return result;
        result.splice(n);
        return result;
    }

    select<TReturn>(this: Collection<T>, selector: Func<[T], TReturn>): Collection<TReturn> {
        let result = new Collection<TReturn>(this.options);
        for (let item of this) {
            result.push(selector(item));
        }
        return result;
    }

    skip(this: Collection<T>, n: number): Collection<T> {
        if (n >= this.length) return new Collection<T>(this.options);
        let result = this.copy();
        result.splice(0, n);
        return result;
    }

    union(this: Collection<T>, collection: IQueryable<T>): Collection<T>;
    union(this: Collection<T>, collection: IQueryable<T>, comparer: Func<[T, T], boolean>): Collection<T>;
    union(this: Collection<T>, collection: any, comparer?: any) {
        if (typeof comparer === 'undefined') comparer = (a: any, b: any) => a === b;

        let result = this.copy();
        for (let item of collection) {
            result.push(item);
        }
        return result.distinct(comparer);
    }

    where(this: Collection<T>, predicate: Func<[T], boolean>): Collection<T> {
        let result = new Collection<T>(this.options);
        for (let item of this) {
            if (predicate(item)) result.push(item);
        }
        return result;
    }
    //#endregion

    //#region IIterable
    all(this: Collection<T>, predicate: Func<[T], boolean>): boolean {
        for (let item of this) {
            if (predicate(item) === false) return false;
        }
        return true;
    }

    any(this: Collection<T>): boolean;
    any(this: Collection<T>, predicate: Func<[T], boolean>): boolean;
    any(this: Collection<T>, predicate?: any) {
        if (typeof predicate == 'undefined') return this.length > 0;
        for (let item of this) {
            if (predicate(item) === true) return true;
        }
        return false;
    }

    average(this: Collection<number>): number;
    average(this: Collection<T>, selector: Func<[T], number>): number;
    average(this: Collection<any>, selector?: any) {
        if (typeof selector === 'undefined') selector = (item: number) => item;
        let total = 0;
        for (let item of this) {
            total += selector(item);
        }
        return total / this.length;
    }

    clone(this: Collection<T>): Collection<T> {
        let result = new Collection<T>(this.options, this.length);
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                result[key] = this[key];
            }
        }
        return result;
    }

    contains(this: Collection<T>, item: T) {
        return this.indexOf(item) > -1;
    }

    copy(this: Collection<T>): Collection<T> {
        let result = new Collection<T>(this.options);
        if (typeof this.forEach === 'function') {
            this.forEach(item => result.push(item));
        } else {
            for (let i = 0; i < this.length; i++) {
                if (i in this) {
                    result.push(this[i]);
                }
            }
        }
        return result;
    }

    count(this: Collection<T>): number;
    count(this: Collection<T>, predicate: Func<[T], boolean>): number;
    count(this: Collection<T>, predicate?: any) {
        if (typeof predicate === 'undefined') return this.length;
        let result = 0;
        for (let item of this) {
            if (predicate(item)) result++;
        }
        return result;
    }

    equals(this: Collection<T>, collection: IIterable<T>): boolean;
    equals(this: Collection<T>, collection: IIterable<T>, comparer: Func<[T, T], boolean>): boolean;
    equals(this: Collection<T>, collection: any, comparer?: any) {
        if (this.length !== collection.length) return false;
        if (typeof comparer === 'undefined') comparer = (a: T, b: T) => a === b;
        for (let i = 0; i < this.length; i++) {
            if (comparer(this[i], collection[i]) === false) return false;
        }
        return true;
    }

    insert(this: Collection<T>, index: number, item: T): void {
        this.splice(index, 0, item);
    }

    max(this: Collection<number>, defaultValue?: number): number;
    max(this: Collection<T>, selector: Func<[T], number>, defaultValue?: ValueItem<number, T>): ValueItem<number, T>;
    max(this: Collection<any>, selector?: any, defaultValue?: any) {
        return minMax.call(this, selector, defaultValue, (current: any, max: any) => current > max, -Infinity);
    }

    min(this: Collection<number>, defaultValue?: number): number;
    min(this: Collection<T>, selector: Func<[T], number>, defaultValue?: ValueItem<number, T>): ValueItem<number, T>;
    min(this: Collection<any>, selector?: any, defaultValue?: any) {
        return minMax.call(this, selector, defaultValue, (current: any, min: any) => current < min, Infinity);
    }

    prepend(this: Collection<T>, item: T): void {
        this.unshift(item);
    }

    remove(this: Collection<T>, item: T): Collection<T>;
    remove(this: Collection<T>, predicate: Func<[T], boolean>): Collection<T>;
    remove(this: Collection<T>, predicate: any) {
        if (typeof predicate !== 'function') {
            let toDelete: T = predicate;
            predicate = (item: T) => item === toDelete;
        }

        let result: Collection<T> = new Collection(this.options);
        for (let i = 0; i < this.length; i++) {
            if (predicate(this[i])) {
                result.push(this.splice(i--, 1)[0]);
            }
        }
        return result;
    }

    removeAt(this: Collection<T>, index: number): T {
        return this.splice(index, 1)[0];
    }

    sum(this: Collection<number>): number;
    sum(this: Collection<T>, selector: Func<[T], number>): number;
    sum(selector?: any) {
        if (typeof selector === 'undefined') selector = (item: T) => item;
        let result = 0;
        for (let item of this) {
            result += selector(item);
        }
        return result;
    }
    //#endregion

}

import { Group } from "../group";