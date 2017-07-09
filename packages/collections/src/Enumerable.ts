import { IEnumerable } from "./IEnumerable";
import { IEqualityComparer } from "./IEqualityComperer";

export abstract class Enumerable {
    private static isFunction(func: any) {
        return typeof func === 'function';
    }

    private static ArgumentNullException() {
        return new Error('ArgumentNullException');
    }

    public static Aggregate<T>(base: IEnumerable<T> | Array<T>, func: (working: T, next: T) => T): T;
    public static Aggregate<T, TResult>(base: IEnumerable<T> | Array<T>, func: (working: TResult, next: T) => TResult, seed: TResult): TResult;
    public static Aggregate<T>(base: IEnumerable<T> | Array<T>, func: any, seed?: any) {
        if (base == null || func == null || this.isFunction(func)) throw this.ArgumentNullException();
        //base = this.getArray<T>(base);
        if (base.length === 0) throw new Error('InvalidOperationException');

        var current;
        var start = 0;
        if (seed == null) {
            current = seed;
        } else {
            current = base[start++];
        }

        for (var i = start; i < base.length - 1; i++) {
            current = func(current, base[i]);
        }
        return current;
    }

    public static All<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): boolean {
        if (base == null || func == null || this.isFunction(func)) throw this.ArgumentNullException();

        for (let item of base) {
            if (func(item) === false) return false;
        }
        return true;
    }

    public static Any<T>(base: IEnumerable<T> | Array<T>): boolean;
    public static Any<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): boolean;
    public static Any<T>(base: IEnumerable<T> | Array<T>, func?: any) {
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
    public static Average<T>(base: IEnumerable<T> | Array<T>,func?: any) {
        if (base == null) throw this.ArgumentNullException();
        if (func == null) func = (item: T) => item;
        //base = this.getArray(base);

        var total = 0;
        for (let item of base) {
            total += func(item);
        }
        return total / base.length;
    }

    public static Concat<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T> | Array<T>): Array<T> {
        if (collection == null || base == null) throw new Error('ArgumentNullException');
        base = this.ToArray(base);
        collection = this.ToArray(collection);
        return base.concat(collection);
    }

    public static Contains<T>(base: IEnumerable<T> | Array<T>, item: T): boolean;
    public static Contains<T>(base: IEnumerable<T> | Array<T>, item: T, equalityComparer: IEqualityComparer<T>): boolean;
    public static Contains<T>(base: IEnumerable<T> | Array<T>, item: any, equalityComparer?: any) {
        throw new Error("Method not implemented.");
    }
    public static Count<T>(base: IEnumerable<T> | Array<T>): number;
    public static Count<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): number;
    public static Count<T>(base: IEnumerable<T> | Array<T>, func?: any) {
        throw new Error("Method not implemented.");
    }
    public static Distinct<T>(base: IEnumerable<T> | Array<T>): Array<T>;
    public static Distinct<T>(base: IEnumerable<T> | Array<T>, equalityComparer: IEqualityComparer<T>): Array<T>;
    public static Distinct<T>(base: IEnumerable<T> | Array<T>, equalityComparer?: any) {
        throw new Error("Method not implemented.");
    }
    public static ElementAt<T>(base: IEnumerable<T> | Array<T>, index: number): T {
        throw new Error("Method not implemented.");
    }
    public static ElementAtOrDefault<T>(base: IEnumerable<T> | Array<T>, index: number): T {
        throw new Error("Method not implemented.");
    }
    public static Except<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T>): Array<T>;
    public static Except<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T>, equalityComparer: IEqualityComparer<T>): Array<T>;
    public static Except<T>(base: IEnumerable<T> | Array<T>, collection: any, equalityComparer?: any) {
        throw new Error("Method not implemented.");
    }
    public static First<T>(base: IEnumerable<T> | Array<T>): T;
    public static First<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): T;
    public static First<T>(base: IEnumerable<T> | Array<T>, func?: any) {
        throw new Error("Method not implemented.");
    }
    public static FirstOrDefault<T>(base: IEnumerable<T> | Array<T>): T;
    public static FirstOrDefault<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): T;
    public static FirstOrDefault<T>(base: IEnumerable<T> | Array<T>, func?: any) {
        throw new Error("Method not implemented.");
    }
    public static GroupBy<T, TResult>(base: IEnumerable<T> | Array<T>, keys: IEnumerable<string> | string[]): IEnumerable<TResult>;
    public static GroupBy<T, TResult>(base: IEnumerable<T> | Array<T>, keys: IEnumerable<string> | string[], equalityComparer: (itemA: T, itemB: T) => boolean): IEnumerable<TResult>;
    public static GroupBy(keys: any, equalityComparer?: any) {
        throw new Error("Method not implemented.");
    }
    public static Intersect<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T> | T[]): Array<T>;
    public static Intersect<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T> | T[], equalityComparer: (itemA: T, itemB: T) => boolean): Array<T>;
    public static Intersect<T>(base: IEnumerable<T> | Array<T>, collection: any, equalityComparer?: any) {
        throw new Error("Method not implemented.");
    }
    public static Join<T>(base: IEnumerable<T> | Array<T>, keys: IEnumerable<string> | string[]): Array<T>;
    public static Join<T>(base: IEnumerable<T> | Array<T>, keys: IEnumerable<string> | string[], equalityComparer: (itemA: T, itemB: T) => boolean): Array<T>;
    public static Join<T>(base: IEnumerable<T> | Array<T>, keys: any, equalityComparer?: any) {
        throw new Error("Method not implemented.");
    }
    public static Last<T>(base: IEnumerable<T> | Array<T>): T;
    public static Last<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): T;
    public static Last<T>(base: IEnumerable<T> | Array<T>, func?: any) {
        throw new Error("Method not implemented.");
    }
    public static LastOrDefault(): T;
    public static LastOrDefault(func: (item: T) => boolean): T;
    public static LastOrDefault(func?: any) {
        throw new Error("Method not implemented.");
    }
    public static Max<T>(base: IEnumerable<T> | Array<T>): number;
    public static Max<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => number): number;
    public static Max<T>(base: IEnumerable<T> | Array<T>, func?: any) {
        throw new Error("Method not implemented.");
    }
    public static Min<T>(base: IEnumerable<T> | Array<T>): number;
    public static Min<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => number): number;
    public static Min<T>(base: IEnumerable<T> | Array<T>, func?: any) {
        throw new Error("Method not implemented.");
    }
    public static OfType<T>(base: IEnumerable<T> | Array<T>, type: Function): IEnumerable<T> {
        throw new Error("Method not implemented.");
    }
    public static OrderBy<T>(base: IEnumerable<T> | Array<T>): Array<T>;
    public static OrderBy<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => ): Array<T>;
    public static OrderBy<T>(base: IEnumerable<T> | Array<T>, func?: any) {
        throw new Error("Method not implemented.");
    }
    public static Reverse<T>(base: IEnumerable<T> | Array<T>): IEnumerable<T> {
        throw new Error("Method not implemented.");
    }
    public static Select<T, TResult>(base: IEnumerable<T> | Array<T>, func: (item: T) => TResult): IEnumerable<TResult> {
        throw new Error("Method not implemented.");
    }
    public static Equals<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T>): boolean;
    public static Equals<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T>, equalityComparer: IEqualityComparer<T>): boolean;
    public static Equals<T>(base: IEnumerable<T> | Array<T>, collection: any, equalityComparer?: any) {
        throw new Error("Method not implemented.");
    }
    public static Single<T>(base: IEnumerable<T> | Array<T>): T {
        throw new Error("Method not implemented.");
    }
    public static SingleOrDefault<T>(base: IEnumerable<T> | Array<T>): T {
        throw new Error("Method not implemented.");
    }
    public static Skip<T>(base: IEnumerable<T> | Array<T>, count: number): IEnumerable<T> {
        throw new Error("Method not implemented.");
    }
    public static SkipWhile<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): IEnumerable<T> {
        throw new Error("Method not implemented.");
    }
    public static Sum<T>(base: IEnumerable<T> | Array<T>): number;
    public static Sum<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => number): number;
    public static Sum<T>(base: IEnumerable<T> | Array<T>, func?: any) {
        throw new Error("Method not implemented.");
    }
    public static Take<T>(base: IEnumerable<T> | Array<T>, count: number): IEnumerable<T> {
        throw new Error("Method not implemented.");
    }
    public static TakeWhile<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): IEnumerable<T> {
        throw new Error("Method not implemented.");
    }
    public static ToArray<T>(base: IEnumerable<T> | Array<T>): Array<T> {
        var result: Array<T> = [];
        for (let item of base) result.push(item);
        return result;
    }
    public static Union<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T>): Array<T>;
    public static Union<T>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<T>, equalityComparer: IEqualityComparer<T>): Array<T>;
    public static Union<T>(base: IEnumerable<T> | Array<T>, collection: any, equalityComparer?: any) {
        throw new Error("Method not implemented.");
    }
    public static Where<T>(base: IEnumerable<T> | Array<T>, func: (item: T) => boolean): Array<T>;
    public static Where<T>(base: IEnumerable<T> | Array<T>, func: (item: T, index: number) => boolean): Array<T>;
    public static Where<T>(base: IEnumerable<T> | Array<T>, func: any) {
        throw new Error("Method not implemented.");
    }
    public static Zip<T, TCollection, TResult>(base: IEnumerable<T> | Array<T>, collection: IEnumerable<TCollection>, func: (itemA: T, itemB: TCollection) => TResult): TResult {
        throw new Error("Method not implemented.");
    }

}