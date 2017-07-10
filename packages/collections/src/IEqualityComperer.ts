export interface IEqualityComparer<T, T2 = {}> {
    (itemA: T, itemB: T): boolean;
    (itemA: T, itemB: T2): boolean;
}