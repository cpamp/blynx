import { ICollection } from "./ICollection";
import { IQueryable } from "./collections/IQueryable";
import { Func } from "./func";
import { IIterable, ValueItem } from "./collections/IIterable";
import { IGroup } from "./IGroup";
import { InvalidOperationError, errorMessages } from "./errors";

export class Collection<T> extends Array<T> implements ICollection<T> {
    constructor(...args: any[]) {
        let $this = super(...args);
        if (typeof this.__extendNoop__ !== 'function') {
            for (let key in Collection.prototype) {
                if (Object.prototype.hasOwnProperty.call(Collection.prototype, key)) {
                    (<any>$this)[key] = function () { return Collection.prototype[key].apply($this, arguments); };
                }
            }
            // if (typeof (<any>Object).setPrototypeOf === 'function') {
            //     (<any>Object).setPrototypeOf(this, Collection.prototype);
            // }
        }
    }

    private __extendNoop__() {}

    //#region IQueryable
    distinct(this: ICollection<T>): ICollection<T>;
    distinct(this: ICollection<T>, comparer: Func<[T, T], boolean>): ICollection<T>;
    distinct(comparer?: any) {
        if (typeof comparer === 'undefined') comparer = (a: T, b: T) => a === b;

        let result = new Collection<T>();
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

    private firstLast(predicate: any, defaultValue: any, hasPredicateFn: Func<[Function, any], {found: boolean, value: any}>, hasNoPredicateFn: Func<[void], any>) {
        if (typeof predicate !== 'function' && typeof defaultValue === 'undefined')  defaultValue = predicate;
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

    first(this: ICollection<T>, defaultValue?: T | undefined): T;
    first(this: ICollection<T>, predicate: Func<[T], boolean>, defaultValue?: T | undefined): T;
    first(predicate?: any, defaultValue?: any) {
        return this.firstLast(predicate, defaultValue, (predicate, defaultValue) => {
            for (let item of this) {
                if ((<any>predicate)(item)) return {found: true, value: item};
            }
            return {found: false, value: defaultValue};
        }, () => this[0]);
    }

    groupBy<TKey>(this: ICollection<T>, selector: Func<[T], TKey>): ICollection<IGroup<TKey, T>>;
    groupBy<TKey>(this: ICollection<T>, selector: Func<[T], TKey>, comparer: Func<[TKey, TKey], boolean>): ICollection<IGroup<TKey, T>>;
    groupBy(selector: any, comparer?: any) {
        if (typeof comparer === 'undefined') comparer = (a: any, b: any) => a === b;

        let result = new Collection<IGroup<any, T>>();
        for (let item of this) {
            if (result.length === 0) {
                let group = new Group<any, T>(selector(item));
                group.push(item);
                result.push(group);
            } else {
                for (let rItem of result) {
                    if (comparer(selector(item), rItem.key)) {
                        rItem.push(item);
                        break;
                    }
                }
            }
        }
        return result;
    }

    innerJoin<TInner, TKey, TResult>(this: ICollection<T>, inner: IQueryable<TInner>, outerKeySelector: Func<[T], TKey>, innerKeySelector: Func<[TInner], TKey>, resultSelector: Func<[T, TInner], TResult>): TResult;
    innerJoin<TInner, TKey, TResult>(this: ICollection<T>, inner: IQueryable<TInner>, outerKeySelector: Func<[T], TKey>, innerKeySelector: Func<[TInner], TKey>, resultSelector: Func<[T, TInner], TResult>, comparer: Func<[TKey, TKey], boolean>): TResult;
    innerJoin(inner: any, outerKeySelector: any, innerKeySelector: any, resultSelector: any, comparer?: any) {
        if (typeof comparer === 'undefined') comparer = (a: any, b: any) => a === b;

        let result = new Collection();
        for (let outerItem of this) {
            for (let innerItem of inner) {
                if (comparer(outerKeySelector(outerItem), innerKeySelector(innerItem))) {
                    result.push(resultSelector(outerItem, innerItem));
                }
            }
        }
        return result;
    }

    last(this: ICollection<T>, defaultValue: T): T;
    last(this: ICollection<T>, predicate: Func<[T], boolean>, defaultValue: T): T;
    last(predicate: any, defaultValue?: any) {
        return this.firstLast(predicate, defaultValue, (predicate, defaultValue) => {
            for (let i = this.length - 1; i >= 0; i--) {
                if ((<any>predicate)(this[i])) return {found: true, value: this[i]};
            }
            return {found: false, value: defaultValue};
        }, () => this[this.length - 1]);
    }

    private orderByBase(selector: Func<[T], any>, desc: boolean = false) {
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

    orderBy<TOrderBy>(this: ICollection<T>, selector: Func<[T], TOrderBy>): ICollection<T>;
    orderBy(selector: any) {
        return this.orderByBase(selector);
    }

    orderByDesc<TOrderBy>(this: ICollection<T>, selector: Func<[T], TOrderBy>): ICollection<T>;
    orderByDesc(selector: any) {
        return this.orderByBase(selector)
    }

    limit(this: ICollection<T>, n: number): ICollection<T>;
    limit(n: number) {
        let result = this.copy();
        if (n > this.length + 1) return result;
        result.splice(n - 1);
        return result;
    }

    select<TReturn>(this: ICollection<T>, selector: Func<[T], TReturn>): ICollection<TReturn> {
        let result = new Collection<TReturn>();
        for (let item of this) {
            result.push(selector(item));
        }
        return result;
    }

    skip(this: ICollection<T>, n: number): ICollection<T> {
        let result = new Collection<T>();
        if (n > this.length + 1) return result;
        result.splice(0, n);
        return result;
    }

    union(this: ICollection<T>, collection: IQueryable<T>): ICollection<T>;
    union(this: ICollection<T>, collection: IQueryable<T>, comparer: Func<[T, T], boolean>): ICollection<T>;
    union(collection: any, comparer?: any) {
        if (typeof comparer === 'undefined') comparer = (a: any, b: any) => a === b;

        let result = this.copy();
        result.concat(collection);
        return result.distinct(comparer);
    }

    where(this: ICollection<T>, predicate: Func<[T], boolean>): ICollection<T> {
        let result = new Collection<T>();
        for (let item of this) {
            if (predicate(item)) result.push(item);
        }
        return result;
    }
    //#endregion

    //#region IIterable
    all(this: ICollection<T>, predicate: Func<[T], boolean>): boolean {
        for (let item of this) {
            if (predicate(item) === false) return false;
        }
        return true;
    }

    any(this: ICollection<T>): boolean;
    any(this: ICollection<T>, predicate: Func<[T], boolean>): boolean;
    any(predicate?: any) {
        if (typeof predicate == 'undefined') return this.length > 0;
        for (let item of this) {
            if (predicate(item) === true) return true;
        }
        return false;
    }

    average(this: ICollection<number>): number;
    average(this: ICollection<T>, selector: Func<[T], number>): number;
    average(selector?: any) {
        if (typeof selector === 'undefined') selector = (item: number) => item;
        let total = 0;
        for (let item of this) {
            total += selector(item);
        }
        return total / this.length;
    }

    contains(this: ICollection<T>, item: T) {
        return this.indexOf(item) > -1;
    }

    copy(this: ICollection<T>): ICollection<T> {
        return new Collection(...this.slice());
    }

    count(this: ICollection<T>): number;
    count(this: ICollection<T>, predicate: Func<[T], boolean>): number;
    count(predicate?: any) {
        if (typeof predicate === 'undefined') return this.length;
        let result = 0;
        for (let item of this) {
            if (predicate(item)) result++;
        }
        return result;
    }

    equals(this: ICollection<T>, collection: IIterable<T>): boolean;
    equals(this: ICollection<T>, collection: IIterable<T>, comparer: Func<[T, T], boolean>): boolean;
    equals(collection: any, comparer?: any) {
        if (this.length !== collection.length) return false;
        if (typeof comparer === 'undefined') comparer = (a: T, b: T) => a === b;
        for (let i = 0; i < this.length; i++) {
            if (comparer(this[i], collection[i]) === false) return false;
        }
        return true;
    }

    insert(this: ICollection<T>, index: number, item: T): void {
        this.splice(index, 0, item);
    }

    private minMax(this: ICollection<T>, selector: any | undefined, defaultValue: any | undefined, comparer: Func<[number, number], boolean>, starter: number) {
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

    max(this: ICollection<number>, defaultValue?: number): number;
    max(this: ICollection<T>, selector: Func<[T], number>, defaultValue?: number): ValueItem<number, T>;
    max(selector?: any, defaultValue?: any) {
        return this.minMax(selector, defaultValue, (current, max) => current > max, -Infinity);
    }

    min(this: ICollection<number>, defaultValue?: number): number;
    min(this: ICollection<T>, selector: Func<[T], number>, defaultValue?: number): ValueItem<number, T>;
    min(selector?: any, defaultValue?: any) {
        return this.minMax(selector, defaultValue, (current, min) => current < min, Infinity);
    }

    prepend(this: ICollection<T>, item: T): void {
        this.unshift(item);
    }

    remove(this: ICollection<T>, item: T): ICollection<T>;
    remove(this: ICollection<T>, predicate: Func<[T], boolean>): ICollection<T>;
    remove(predicate: any) {
        if (typeof predicate !== 'function') {
            let toDelete: T = predicate;
            predicate = (item: T) => item === toDelete;
        }

        let result: Collection<T> = new Collection();
        for (let i = 0; i < this.length; i++) {
            if (predicate(this[i])) {
                result.push(this.splice(i--, 1)[0]);
            }
        }
        return result;
    }

    removeAt(this: ICollection<T>, index: number): T {
        return this.splice(index, 1)[0];
    }

    sum(this: ICollection<number>): number;
    sum(this: ICollection<T>, selector: Func<[T], number>): number;
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

import { Group } from "./Group";