import { IQueryable } from "./collections/IQueryable";
import { IIterable } from "./collections/IIterable";

export interface ICollection<T> extends
IQueryable<T, ICollection<T>>,
IIterable<T, ICollection<T>>
{ }