export interface IIterator<T = {}> {
    next(): IteratorResult<T>;
}