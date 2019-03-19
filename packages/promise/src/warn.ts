const WARN_PREFIX = 'Warning @blynx/promise:'
export const WARN_MULTIPLE_RESOLVE = 'executor attempted to resolve/reject more than once'

export function warn(message: string): void {
    return console.warn(`${WARN_PREFIX} ${message}`)
}