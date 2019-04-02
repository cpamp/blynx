import { IFlagEnum } from "./spec";

const none = 'none';

/**
 * Class for creating a set of flagged enums.
 */
export class FlagEnum implements IFlagEnum {
    [key:string]: FlagItem;

    constructor(...flags: string[])
    constructor(flags: string[])
    constructor(...flags: any[]) {
        if (Array.isArray(arguments[0])) {
            flags = arguments[0]
        } else if (arguments.length == 0) {
           return
        }
        FlagEnum.__defineFlags.call(this, flags)
    }

    static __init(this: FlagEnum) {
        let flags = []
        for (let key in this) {
            if (this.hasOwnProperty(key) && key !== none)
                flags.push(key)
        }
        FlagEnum.__defineFlags.call(this, flags)
    }

    static __defineFlags(this: FlagEnum, flags: Array<string>) {
        this[none] = new FlagItem(none, 0);
        let count = 1;
        for (let flag of flags) {
            Object.defineProperty(this, flag, {
                writable: false,
                enumerable: true,
                configurable: false,
                value: new FlagItem(flag, 1<<count++)
            })
        }
    }

    //#region statics
    /**
     * Check if two flags are equal.
     * @param value1 First value to compare.
     * @param value2 Second value to compare.
     */
    static equals(value1: number | FlagItem, value2: number | FlagItem): boolean {
        return value1 === value2
    }

    /**
     * Checks if a flag is in another flag.
     * @param owner Flag to compare against `has` flag.
     * @param has Flag to check if it is part of `owner` flag.
     */
    static has(owner: number | FlagItem, has: number | FlagItem): boolean {
        return (+owner & +has) !== 0
    }

    /**
     * Checks if a flag has all specified flags.
     * @param owner Flag to compare against all `has` flags.
     * @param has Flags to check if they are part of `owner` flag.
     */
    static hasAll(owner: number | FlagItem, has: Array<number | FlagItem>): boolean
    static hasAll(owner: number | FlagItem, ...has: Array<number | FlagItem>): boolean
    static hasAll(owner: number | FlagItem, ...has: Array<any>): boolean {
        if (Array.isArray(arguments[1])) has = arguments[1];

        for (let item of has as Array<number | FlagItem>) {
            if (!FlagEnum.has(owner, item)) return false;
        }
        return true;
    }

    /**
     * Checks if a flag has any specified flags.
     * @param owner Flag to compare against all `has` flags.
     * @param has Flags to check if they are part of `owner` flag.
     */
    static hasAny(owner: number | FlagItem, has: Array<number | FlagItem>): boolean
    static hasAny(owner: number | FlagItem, ...has: Array<number | FlagItem>): boolean
    static hasAny(owner: number | FlagItem, ...has: Array<any>): boolean {
        if (Array.isArray(arguments[1])) has = arguments[1];

        for (let item of has as Array<number | FlagItem>) {
            if (FlagEnum.has(owner, item)) return true;
        }
        return false;
    }

    /**
     * Join flags by name and value.
     * @param flags FlagItems to join.
     */
    static join(flags: Array<FlagItem>): FlagItem
    static join(...flags: Array<FlagItem>): FlagItem
    static join(...flags: any[]) {
        if (Array.isArray(arguments[0])) flags = arguments[0]
        
        let names: Array<string> = [];
        let value: number = 0;
        for (let flag of flags as Array<FlagItem>) {
            let name: string = flag.name;
            if (names.length > 0) name = name.charAt(0).toUpperCase() + name.slice(1);
            names.push(flag.name);
            value |= flag.value;
        }
        return new FlagItem(names.join('And'), value)
    }
    //#endregion
}

import { FlagItem } from "./flagItem";
