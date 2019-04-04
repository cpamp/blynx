import { NativeSymbol, NativeSafe } from "./nativeSymbol";
import { getName } from "./getName";
import { PrivateSymbol } from "./privateSymbol";
import { IPublicSymbol } from "./publicSymbol.interface";

//@ts-ignore Ignore property warnings
let PublicSymbol: IPublicSymbol = function Symbol(this: any, description?: string) {
    if (this instanceof Symbol) throw new TypeError('Symbol is not a constructor')
    if (NativeSafe) return NativeSymbol(description)

    if (typeof description === 'undefined') description = ''
    else if (typeof description !== 'string') description = String(description)

    let symbol = Object.create(PrivateSymbol.prototype)
    return Object.defineProperties(symbol, {
        __description: define(description),
        __name: define(getName(description))
    })
}

function define(value: any, configurable: boolean = false, enumerable: boolean = false, writeable: boolean = false) {
    return {
        value, configurable, enumerable, writeable
    }
}

function getSymbol(name: string) {
    return (NativeSymbol && NativeSymbol[name]) || PublicSymbol(name)
}

Object.defineProperties(PublicSymbol, {
    asyncIterator: define(getSymbol('asyncIterator')),
    hasInstance: define(getSymbol('hasInstance')),
    isConcatSpreadable: define(getSymbol('isConcatSpreadable')),
    iterator: define(getSymbol('iterator')),
    match: define(getSymbol('match')),
    matchAll: define(getSymbol('matchAll')),
    replace: define(getSymbol('replace')),
    search: define(getSymbol('search')),
    species: define(getSymbol('species')),
    split: define(getSymbol('split')),
    toPrimitive: define(getSymbol('toPrimitive')),
    toStringTag: define(getSymbol('toStringTag')),
    unscopables: define(getSymbol('unscopables'))
})

Object.defineProperties(PrivateSymbol.prototype, {
    constructor: define(PublicSymbol, true, false, true)
})

Object.defineProperties(PublicSymbol.prototype, {
    toString: define(function (this: PrivateSymbol) { return `Symbol(${this.__description})` }, true, false, true),
    valueOf: define(function (this: PrivateSymbol) { return this }, true, false, true),
    [PublicSymbol.toPrimitive]: define(function (this: any) {
        if (typeof this === 'symbol') return this
        return this.toString()
    }),
    [PublicSymbol.toStringTag]: define('Symbol', true)
})

Object.defineProperty(PrivateSymbol.prototype, PublicSymbol.toStringTag, define(PublicSymbol.prototype[PublicSymbol.toStringTag], true))
Object.defineProperty(PrivateSymbol.prototype, PublicSymbol.toPrimitive, define(PublicSymbol.prototype[PublicSymbol.toPrimitive], true))

export { PublicSymbol }