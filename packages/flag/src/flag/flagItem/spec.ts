export interface IFlagItem {
    /**
     * The name of the flag.
     */
    name: string;

    /**
     * The flag value.
     */
    value: number;

    /**
     * Checks if a flag is in this flag.
     */
    has(flag: number | IFlagItem): boolean

    /**
     * Checks if all flags are in this flag.
     * @param flags Flags to check for.
     */
    hasAll(flags: Array<number | IFlagItem>): boolean
    hasAll(...flags: Array<number | IFlagItem>): boolean

    /**
     * Checks if any flags are in this flag.
     * @param flags Flags to check for.
     */
    hasAny(flags: Array<number | IFlagItem>): boolean
    hasAny(...flags: Array<number | IFlagItem>): boolean
}