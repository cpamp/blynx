function isTest() {
    return process && process.env && process.env.NODE_ENV === 'test'
}

export const NativeSymbol: any = isTest ? void 0 : Symbol
export const NativeSafe = typeof NativeSymbol === 'function'