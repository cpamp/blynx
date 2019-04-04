export class PrivateSymbol {
    public __name!: string
    public __description!: string

    constructor() {
        throw new Error('Class constructor InternalSymbol cannot be invoked')
    }

    toString() {
        return this.__name
    }
}