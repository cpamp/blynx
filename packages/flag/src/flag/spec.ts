import { IFlagItem } from "./flagItem/spec";

export interface IFlagEnum {
    /**
     * The flags enum values.
     */
    [key:string]: IFlagItem;
}