import { ISubscription } from "./spec";

export class Subscription<T> implements ISubscription<T> {
    unsubscribe(): void {
        throw new Error("Method not implemented.");
    }

}