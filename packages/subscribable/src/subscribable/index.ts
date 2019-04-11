import { ISubscription } from "../subscription/spec";

export interface ISubscribable<T> {
    /**
     * Subscribe to a subscrible.
     */
    subscribe(): ISubscription<T>

    /**
     * Destroy the subscribable and all subscriptions and messengers.
     */
    destroy(): void
}