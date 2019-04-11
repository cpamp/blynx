function stylize(code: number | string) {
    return `\x1b[${code}m`
}

export function style(text: string, start: number | string, end?: number) {
    if (end == null) return `${text}${stylize(start)}`
    return `${stylize(start)}${text}${stylize(end)}`
}