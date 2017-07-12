import { IEnumerable } from "./IEnumerable";
import { IEqualityComparer } from "./IEqualityComperer";
import { IOrder, OrderResult } from "./IOrder";

export abstract class Enumerable {
    private static isFunction(func: any) {
        return typeof func === 'function';
    }

    private static equalityComparer<T>(itemA: T, itemB: T): boolean {
        return itemA === itemB;
    }

    private static ArgumentNullException() {
        return new Error('ArgumentNullException');
    }

    private static ArgumentOutOfRangeException() {
        return new Error('ArgumentOutOfRangeException');
    }

    private static ArgumentInvalidException() {
        return new Error('ArgumentInvalidException');
    }

    private static InvalidOperationException() {
        return new Error('InvalidOperationException');
    }

    public static Aggregate<T>(base: IEnumerable<T> | Array<T>, func: (working: T, next: T) => T): T;
    public static Aggregate<T, TResult>(base: IEnumerable<T> | Array<T>, func: (working: TResult, next: T) => TResult, seed: TResult): TResult;
    public static Aggregate(base: any, func: any, seed?: any) {
        if (base == null || func == null || !this.isFunction(func)) throw this.ArgumentNullException();
        base = base instanceof Array ? base : base.ToArray();
        if (base.length === 0) throw this.InvalidOperationException();

        let current;
        let start = 0;
        if (seed == null) {
            current = seed;
        } else {
            current = base[start++];
        }

        for (let i = start; i < base.length - 1; i++) {
            current = func(current, base[i]);
        }
        return current;
    }

    public static All<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): boolean {
        if (base == null || func == null || !this.isFunction(func)) throw this.ArgumentNullException();

        for (let item of base) {
            if (func(item) === false) return false;
        }
        return true;
    }

    public static Any<T>(base: IEnumerable<T> | Array<T>): boolean;
    public static Any<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): boolean;
    public static Any(base: any, func?: any) {
        if (base == null) throw this.ArgumentNullException();

        if (func == null) {
            if (base.length > 0) return true;
            else return false;
        }
        
        for (let item of base) {
            if (func(item) === true) return true;
        }
        return false;
    }

    public static Average<T>(base: IEnumerable<T> | Array<T>): number;
    public static Average<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => number): number;
    public static Average(base: any,func?: any) {
        if (base == null) throw this.ArgumentNullException();
        if (func == null || !this.isFunction(func)) func = (item: any) => item;
        //base = this.getArray(base);

        let total = 0;
        for (let item of base) {
            total += func(item);
        }
        return total / base.length;
    }

    public static Concat<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T> | Array<T>): Array<T> {
        if (collection == null || base == null) throw this.ArgumentNullException();
        base = this.ToArray(base);
        collection = this.ToArray(collection);
        return base.concat(collection);
    }

    public static Contains<T>(base: IEnumerable<T> | Array<T>, item: T): boolean;
    public static Contains<T>(base: IEnumerable<T> | Array<T>, item: T, equalityComparer: IEqualityComparer<T>): boolean;
    public static Contains(base: any, item: any, equalityComparer?: any) {
        if (base == null) throw this.ArgumentNullException();
        if (equalityComparer == null || !this.isFunction(equalityComparer)) equalityComparer = this.equalityComparer;

        for (let baseItem of base) {
            if (equalityComparer(baseItem, item)) return true;
        }
        return false;
    }

    public static Count<T>(base: IEnumerable<T> | Array<T>): number;
    public static Count<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): number;
    public static Count(base: any, func?: any) {
        if (func == null) return base.length;
        if (!this.isFunction(func)) throw this.ArgumentInvalidException();

        let count = 0;
        for (let item of base) {
            if (func(item) === true) count++;
        }
        return count;
    }

    public static Distinct<T>(base: IEnumerable<T> | Array<T>): Array<T>;
    public static Distinct<T>(base: IEnumerable<T> | Array<T>, equalityComparer: IEqualityComparer<T>): Array<T>;
    public static Distinct(base: any, equalityComparer?: any) {
        if (base == null) throw this.ArgumentNullException();
        if (equalityComparer == null || !this.isFunction(equalityComparer)) equalityComparer = this.equalityComparer;

        let result: Array<any> = [];
        for (let item of base) {
            let found = false;
            for (let dist of result) {
                if (equalityComparer(item, dist)) {
                    found = true;
                    break;
                }
            }
            if (found === false) result.push(item);
        }
        return result;
    }

    public static ElementAt<T>(base: IEnumerable<T> | Array<T>, index: number): T {
        if (base == null) throw this.ArgumentNullException();
        if (base instanceof Array) return base[index];

        let count = 0;
        for (let item of base) {
            if (count === index) return item;
        }
        throw this.ArgumentOutOfRangeException();
    }

    public static ElementAtOrDefault<T>(base: IEnumerable<T> | Array<T>, index: number): T | null {
        if (base == null) throw this.ArgumentNullException();

        try {
            return this.ElementAt(base, index);
        } catch(e) {
            return null;
        }
    }

    public static Except<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T>): Array<T>;
    public static Except<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T>, equalityComparer: IEqualityComparer<T>): Array<T>;
    public static Except(base: any, collection: any, equalityComparer?: any) {
        if (base == null || collection == null) throw this.ArgumentNullException();
        if (equalityComparer == null || !this.isFunction(equalityComparer)) equalityComparer = this.equalityComparer;

        let result: Array<any> = [];
        for (let baseItem of base) {
            let found = false;
            for (let colItem of collection) {
                if (equalityComparer(baseItem, colItem)) {
                    found = true;
                    break;
                }
            }
            if (found === false) result.push(baseItem);
        }
        return result;
    }
    
    public static First<T>(base: IEnumerable<T> | Array<T>): T;
    public static First<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): T;
    public static First(base: any, func?: any) {
        if (base == null) throw this.ArgumentNullException();
        if (base.length === 0) throw this.InvalidOperationException();
        if (func == null) {
            if (base instanceof Array) return base[0];
            return this.ElementAt(base, 0);
        }
        
        if (!this.isFunction(func)) throw this.ArgumentInvalidException();
        for (let item of base) {
            if (func(item) === true) return item;
        }
        throw this.InvalidOperationException();
    }

    public static FirstOrDefault<T>(base: IEnumerable<T> | Array<T>): T | null;
    public static FirstOrDefault<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): T | null;
    public static FirstOrDefault(base: any, func?: any) {
        if (base == null) throw this.ArgumentNullException();
        if (func == null) {
            if (base instanceof Array) return base[0] || null;
            return this.ElementAtOrDefault(base, 0);
        }

        if (!this.isFunction(func)) throw this.ArgumentInvalidException();
        try { return this.First(base, func); }
        catch(e) { return null; }
    }

    public static GroupBy<T, TResult>(base: IEnumerable<T> | Array<T>, keys: IEnumerable<string> | string[]): Array<TResult>;
    public static GroupBy<T, TResult>(base: IEnumerable<T> | Array<T>, keys: IEnumerable<string> | string[], equalityComparer: (itemA: T, itemB: T) => boolean): Array<TResult>;
    public static GroupBy(base: any, keys: any, equalityComparer?: any) {
        if (base == null || keys == null) throw this.ArgumentNullException();
        if (keys.length === 0) throw this.ArgumentInvalidException();
        if (equalityComparer == null || !this.isFunction(equalityComparer)) equalityComparer = this.equalityComparer;

        let result: Array<any> = [];
        for (let item of base) {
            let match: any = {};
            let doesMatch = true;
            for (let rItem of result) {
                for (let key of keys) {
                    if (equalityComparer(item[key], rItem[key]) === false) {
                        doesMatch = false;
                        break;
                    }
                    match[key] = item[key];
                }
            }
            if (doesMatch) result.push(match);
        }
        return result;
    }
    public static Intersect<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T> | T[]): Array<T>;
    public static Intersect<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T> | T[], equalityComparer: (itemA: T, itemB: T) => boolean): Array<T>;
    public static Intersect(base: any, collection: any, equalityComparer?: any) {
        if (base == null || collection == null) throw this.ArgumentNullException();
        if (equalityComparer == null) equalityComparer = this.equalityComparer;

        let result: Array<any> = [];
        for (let item of base) {
            let doesMatch = false;
            for (let colItem of collection) {
                if (equalityComparer(item, colItem) === true) {
                    result.push(item);
                }
            }
        }
        return result;
    }

    public static Join<T, TCollection, TResult>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<TCollection> | Array<TCollection>, resultFactory?: (itemA: T, itemB: TCollection) => TResult): Array<TResult>;
    public static Join<T, TCollection, TResult>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<TCollection> | Array<TCollection>, resultFactory?: (itemA: T, itemB: TCollection) => TResult, equalityComparer?: (itemA: T, itemB: TCollection) => boolean): Array<TResult>;
    public static Join(base: any, collection: any, resultFactory: any, equalityComparer?: any) {
        if (base == null || collection == null) throw this.ArgumentNullException();
        if (equalityComparer == null || !this.isFunction(equalityComparer)) equalityComparer = this.equalityComparer;
        if (resultFactory == null || !this.isFunction(resultFactory)) resultFactory = (itemA: any, itemB: any) => Object.assign({}, itemA, itemB);

        let result: any[] = [];
        for (let bItem of base) {
            for (let cItem of base) {
                if (equalityComparer(bItem, cItem) === true) {
                    result.push(resultFactory(bItem, cItem));
                }
            }
        }
        return result;
    }

    public static Last<T>(base: IEnumerable<T> | Array<T>): T;
    public static Last<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): T;
    public static Last(base: any, func?: any) {
        if (base == null) throw this.ArgumentNullException();
        if (base.length === 0) throw this.InvalidOperationException();
        if (func == null) {
            if (base instanceof Array) return base[base.length - 1];
            else return this.ElementAt(base, base.length - 1);
        }

        if (!this.isFunction(func)) throw this.ArgumentInvalidException();
        let r: any;
        for (let item of base) {
            if (func(item) === true) r = item;
        }
        if (r === void 0) throw this.InvalidOperationException();
        return r;
    }

    public static LastOrDefault<T>(base: IEnumerable<T> | Array<T>): T | null;
    public static LastOrDefault<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): T | null;
    public static LastOrDefault(base: any, func?: any) {
        if (base == null) throw this.ArgumentNullException();
        if (base.length === 0) return null;
        if (func == null) {
            if (base instanceof Array) return base[base.length - 1] || null;
            else return this.ElementAtOrDefault(base, base.length - 1);
        }

        if (!this.isFunction(func)) throw this.ArgumentInvalidException();
        try { return this.Last(base, func); }
        catch(e) { return null; }
    }

    public static Max<T>(base: IEnumerable<T> | Array<T>): number;
    public static Max<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => number): number;
    public static Max(base: any, func?: any) {
        if (base == null) throw this.ArgumentNullException();
        if (base.length === 0) throw this.InvalidOperationException();
        if (func == null || !this.isFunction(func)) func = (item: any) => item;

        var max = -Infinity;
        for (let item of base) {
            var current = func(item);
            if (current > max) max = current;
        }
        return current;
    }

    public static Min<T>(base: IEnumerable<T> | Array<T>): number;
    public static Min<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => number): number;
    public static Min(base: any, func?: any) {
        if (base == null) throw this.ArgumentNullException();
        if (base.length === 0) throw this.InvalidOperationException();
        if (func == null || !this.isFunction(func)) func = (item: any) => item;

        var max = Infinity;
        for (let item of base) {
            var current = func(item);
            if (current < max) max = current;
        }
        return current;
    }

    public static OfType<T>(base: IEnumerable<T> | Array<T>, type: Function): Array<T> {
        if (base == null || type == null) throw this.ArgumentNullException();

        var result: T[] = [];
        for (let item of base) {
            if (item instanceof type) result.push(item);
        }
        return result;
    }
    public static OrderBy<T>(base: IEnumerable<T> | Array<T>, keys: IEnumerable<string> | Array<string>): Array<T>;
    public static OrderBy<T>(base: IEnumerable<T> | Array<T>, keys: IEnumerable<string> | Array<string>, func: IOrder<T>): Array<T>;
    public static OrderBy(base: any, keys: any, func?: any) {
        throw new Error("Method not implemented.");
    }

    public static Reverse<T>(base: IEnumerable<T> | Array<T>): Array<T> {
        if (base == null) throw this.ArgumentNullException();
        if (base.length === 0) throw this.InvalidOperationException();

        let r: T[] = [];
        let count = base.length - 1;
        for (let item of base) {
            r[count--] = item;
        }
        return r;
    }

    public static Select<T, TResult>(base: IEnumerable<T> | Array<T>, func: (item: T) => TResult): Array<TResult> {
        if (base == null || func == null) throw this.ArgumentNullException();
        if (!this.isFunction(func)) throw this.ArgumentInvalidException();

        let r: TResult[] = [];
        for (let item of base) {
            r.push(func(item));
        }
        return r;
    }

    public static Equals<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T>): boolean;
    public static Equals<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T>, equalityComparer: IEqualityComparer<T>): boolean;
    public static Equals(base: any, collection: any, equalityComparer?: any) {
        if (base == null || collection == null) throw this.ArgumentNullException();
        if (!this.isFunction(equalityComparer)) equalityComparer = this.equalityComparer;

        for (let bItem of base) {
            for (let cItem of collection) {
                if (equalityComparer(bItem, cItem) === false) return false;
            }
        }
        return true;
    }

    public static Single<T>(base: IEnumerable<T> | Array<T>): T {
        if (base == null) throw this.ArgumentNullException();
        if (base.length !== 1) throw this.InvalidOperationException();
        return this.ElementAt(base, 0);
    }

    public static SingleOrDefault<T>(base: IEnumerable<T> | Array<T>): T | null {
        if (base == null) throw this.ArgumentNullException();
        if (base.length !== 1) return null;
        return this.ElementAt(base, 0);
    }

    public static Skip<T>(base: IEnumerable<T> | Array<T>, count: number): Array<T> {
        if (base == null) throw this.ArgumentNullException();

        let r: T[] = [];
        let skip = true;
        for (let item of base) {
            if (skip && count-- >= 0) skip = false;
            else r.push(item);
        }
        return r;
    }

    public static SkipWhile<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): Array<T> {
        if (base == null || func == null) throw this.ArgumentNullException();
        if (!this.isFunction(func)) throw this.ArgumentInvalidException();

        var r: T[] = [];
        let skip = true;
        for (let item of base) {
            if (skip && func(item) === false) skip = false;
            else r.push(item);
        }
        return r;
    }

    public static Sum<T>(base: IEnumerable<T> | Array<T>): number;
    public static Sum<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => number): number;
    public static Sum(base: any, func?: any) {
        if (base == null) throw this.ArgumentNullException();
        if (func == null || !this.isFunction(func)) func = (item: any) => item;

        let r = 0;
        for (let item of base) {
            item += func(item);
        }
        return r;
    }

    public static Take<T>(base: IEnumerable<T> | Array<T>, count: number): Array<T> {
        if (base == null) throw this.ArgumentNullException();
        let r: T[] = [];
        for (let item of base) {
            if (count-- >= 0) break;
            r.push(item);
        }
        return r;
    }
    public static TakeWhile<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): Array<T> {
        if (base == null || func == null) throw this.ArgumentNullException();
        if (!this.isFunction(func)) throw this.ArgumentInvalidException();

        var r: T[] = [];
        for (let item of base) {
            if (func(item) === false) break;
            r.push(item);
        }
        return r;
    }

    public static ToArray<T>(base: IEnumerable<T> | Array<T>): Array<T> {
        let result: Array<T> = [];
        for (let item of base) result.push(item);
        return result;
    }

    public static Union<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T>): Array<T>;
    public static Union<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T>, equalityComparer: IEqualityComparer<T>): Array<T>;
    public static Union(base: any, collection: any, equalityComparer?: any) {
        throw new Error("Method not implemented.");
    }

    public static Where<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): Array<T>;
    public static Where<T>(base: IEnumerable<T> | Array<T>, func: (item: T, index: number) => boolean): Array<T>;
    public static Where(base: any, func: any) {
        if (base == null || func == null) throw this.ArgumentNullException();

        let r: any[] = [];
        let count = 0;
        for (let item of base) {
            if (func(item, count++) === true) r.push(item);
        }
        return r;
    }

    public static Zip<T, TCollection, TResult>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<TCollection>, func: (itemA: T, itemB: TCollection) => TResult): TResult {
        throw new Error("Method not implemented.");
    }

}