import { Func } from "../../func";
import { IQueryableSpec } from "./spec";

export interface IQueryable<T, TSelf extends IQueryable<any> = IQueryable<any, any>> extends Array<T>, IQueryableSpec<T, TSelf> {
    join(this: TSelf, separator?: string | undefined): string;
    join<TInner, TKey, TResult>(this: TSelf, inner: IQueryable<TInner>, outerKeySelector: Func<[T], TKey>, innerKeySelector: Func<[TInner], TKey>, resultSelector: Func<[T, TInner], TResult>): TResult;
    join<TInner, TKey, TResult>(this: TSelf, inner: IQueryable<TInner>, outerKeySelector: Func<[T], TKey>, innerKeySelector: Func<[TInner], TKey>, resultSelector: Func<[T, TInner], TResult>, comparer: Func<[TKey, TKey], boolean>): TResult;
}