export function logDeprecated(name: string) {
    var logMethod = typeof console.warn === 'function' ? console.warn : console.log;
    logMethod("WARNING: %s has been flagged as deprecated and may be removed in future releases.", name);
}