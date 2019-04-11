import { IPublisher } from "./spec";
import { ISubscription } from "../subscription/spec";

export class Publisher<T> implements IPublisher<T> {
    private subscriptions: ISubscription<T>[] = []

    constructor () {
    }

    publish(deliverable: T) {
        
    }

    subscribe(): ISubscription<T> {
        throw new Error("Method not implemented.");
    }
    
    destroy(): void {
        throw new Error("Method not implemented.");
    }
}