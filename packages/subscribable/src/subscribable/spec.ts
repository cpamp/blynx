import { ISubscription } from "src/subscription/spec";

export interface ISubscribable {
    subscribe(): ISubscription;
}