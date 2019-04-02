import { FlagEnum } from "..";
import { IFlagItem } from "./spec";

export class FlagItem implements IFlagItem {
    constructor (public name: string, public value: number) {}

    has(flag: number | FlagItem): boolean {
        return FlagEnum.has(this, flag);
    }

    hasAll(flags: Array<number | FlagItem>): boolean
    hasAll(...flags: Array<number | FlagItem>): boolean
    hasAll(...flags: Array<any>): boolean {
        return FlagEnum.hasAll.call(null, this, <any>flags);
    }

    hasAny(flags: Array<number | FlagItem>): boolean
    hasAny(...flags: Array<number | FlagItem>): boolean
    hasAny(...flags: Array<any>): boolean {
        return FlagEnum.hasAny.call(null, this, <any>flags);
    }

    valueOf() {
        return this.value;
    }
}