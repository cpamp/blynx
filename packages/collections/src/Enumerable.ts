import { IEnumerable } from "./IEnumerable";

export abstract class Enumerable<T = {}> implements IEnumerable<T> {
    private value: Array<T> = [];

    Aggregate(func: (working: T, next: T) => T): T;
    Aggregate<TResult>(func: (working: TResult, next: T) => TResult, seed: TResult): TResult;
    Aggregate(func: any, seed?: any) {
        if (func == null) throw new Error('ArgumentNullException');
        if (this.value.length === 0) throw new Error('InvalidOperationException');

        var current;
        var start = 0;
        if (seed == null) {
            current = seed;
        } else {
            current = this.value[start++];
        }

        for (var i = start; i < this.value.length - 1; i++) {
            current = func(current, this.value[i]);
        }
        return current;
    }
    All(func: (item: T) => boolean): boolean {
        throw new Error("Method not implemented.");
    }
    Any(): boolean;
    Any(func: (item: T) => boolean): boolean;
    Any(func?: any) {
        throw new Error("Method not implemented.");
    }
    Average(func: (item: T) => number): number {
        throw new Error("Method not implemented.");
    }
    Concat(collection: IEnumerable<T> | T[]): IEnumerable<T> {
        throw new Error("Method not implemented.");
    }
    Contains(item: T): boolean;
    Contains(item: T, equalityComparer: IEqualityComparer<T>): boolean;
    Contains(item: any, equalityComparer?: any) {
        throw new Error("Method not implemented.");
    }
    Count(): number;
    Count(func: (item: T) => boolean): number;
    Count(func?: any) {
        throw new Error("Method not implemented.");
    }
    Distinct(): IEnumerable<T>;
    Distinct(equalityComparer: IEqualityComparer<T>): IEnumerable<T>;
    Distinct(equalityComparer?: any) {
        throw new Error("Method not implemented.");
    }
    ElementAt(index: number): T {
        throw new Error("Method not implemented.");
    }
    ElementAtOrDefault(index: number): T {
        throw new Error("Method not implemented.");
    }
    Except(collection: IEnumerable<T>): IEnumerable<T>;
    Except(collection: IEnumerable<T>, equalityComparer: IEqualityComparer<T>): IEnumerable<T>;
    Except(collection: any, equalityComparer?: any) {
        throw new Error("Method not implemented.");
    }
    First(): T;
    First(func: (item: T) => boolean): T;
    First(func?: any) {
        throw new Error("Method not implemented.");
    }
    FirstOrDefault(): T;
    FirstOrDefault(func: (item: T) => boolean): T;
    FirstOrDefault(func?: any) {
        throw new Error("Method not implemented.");
    }
    GroupBy<TResult>(keys: IEnumerable<string> | string[]): IEnumerable<TResult>;
    GroupBy<TResult>(keys: IEnumerable<string> | string[], equalityComparer: (itemA: T, itemB: T) => boolean): IEnumerable<TResult>;
    GroupBy(keys: any, equalityComparer?: any) {
        throw new Error("Method not implemented.");
    }
    Intersect(collection: IEnumerable<T> | T[]): IEnumerable<T>;
    Intersect(collection: IEnumerable<T> | T[], equalityComparer: (itemA: T, itemB: T) => boolean): IEnumerable<T>;
    Intersect(collection: any, equalityComparer?: any) {
        throw new Error("Method not implemented.");
    }
    Join(keys: IEnumerable<string> | string[]): IEnumerable<T>;
    Join(keys: IEnumerable<string> | string[], equalityComparer: (itemA: T, itemB: T) => boolean): IEnumerable<T>;
    Join(keys: any, equalityComparer?: any) {
        throw new Error("Method not implemented.");
    }
    Last(): T;
    Last(func: (item: T) => boolean): T;
    Last(func?: any) {
        throw new Error("Method not implemented.");
    }
    LastOrDefault(): T;
    LastOrDefault(func: (item: T) => boolean): T;
    LastOrDefault(func?: any) {
        throw new Error("Method not implemented.");
    }
    Max(): number;
    Max(func: (item: T) => number): number;
    Max(func?: any) {
        throw new Error("Method not implemented.");
    }
    Min(): number;
    Min(func: (item: T) => number): number;
    Min(func?: any) {
        throw new Error("Method not implemented.");
    }
    OfType(type: Function): IEnumerable<T> {
        throw new Error("Method not implemented.");
    }
    OrderBy(): IEnumerable<T>;
    OrderBy(func: (item: T) => ): IEnumerable<T>;
    OrderBy(func?: any) {
        throw new Error("Method not implemented.");
    }
    Reverse(): IEnumerable<T> {
        throw new Error("Method not implemented.");
    }
    Select<TResult>(func: (item: T) => TResult): IEnumerable<TResult> {
        throw new Error("Method not implemented.");
    }
    Equals(collection: IEnumerable<T>): boolean;
    Equals(collection: IEnumerable<T>, equalityComparer: IEqualityComparer<T>): boolean;
    Equals(collection: any, equalityComparer?: any) {
        throw new Error("Method not implemented.");
    }
    Single(): T {
        throw new Error("Method not implemented.");
    }
    SingleOrDefault(): T {
        throw new Error("Method not implemented.");
    }
    Skip(count: number): IEnumerable<T> {
        throw new Error("Method not implemented.");
    }
    SkipWhile(func: (item: T) => boolean): IEnumerable<T> {
        throw new Error("Method not implemented.");
    }
    Sum(): number;
    Sum(func: (item: T) => number): number;
    Sum(func?: any) {
        throw new Error("Method not implemented.");
    }
    Take(count: number): IEnumerable<T> {
        throw new Error("Method not implemented.");
    }
    TakeWhile(func: (item: T) => boolean): IEnumerable<T> {
        throw new Error("Method not implemented.");
    }
    Union(collection: IEnumerable<T>): IEnumerable<T>;
    Union(collection: IEnumerable<T>, equalityComparer: IEqualityComparer<T>): IEnumerable<T>;
    Union(collection: any, equalityComparer?: any) {
        throw new Error("Method not implemented.");
    }
    Where(func: (item: T) => boolean): IEnumerable<T>;
    Where(func: (item: T, index: number) => boolean): IEnumerable<T>;
    Where(func: any) {
        throw new Error("Method not implemented.");
    }
    Zip<TCollection, TResult>(collection: IEnumerable<TCollection>, func: (itemA: T, itemB: TCollection) => TResult): TResult {
        throw new Error("Method not implemented.");
    }

}