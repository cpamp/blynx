export enum OrderResult {
    Greater = 1,
    Equal = 0,
    Less = -1
}
export type IOrder<T> = (itemA: T, itemB: T) => OrderResult;