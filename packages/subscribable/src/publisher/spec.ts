import { ISubscribable } from "../subscribable";

export interface IPublisher<T> extends ISubscribable<T> {
    /**
     * 
     * @param deliverable 
     */
    publish(deliverable: T): void
}