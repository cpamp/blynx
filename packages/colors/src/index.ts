import { style } from './style';

const fg = (code: number) => 30 + code,
    bg = (code: number) => 40 + code,
    bfg = (code: number) => 90 + code,
    bbg = (code: number) => 100 + code

//#region Styles

export const reset = () => style('', 0)

export const bold = (text: string) => style(text, 1, 22)

export const faint = (text: string) => style(text, 2, 22)

export const italic = (text: string) => style(text, 3, 23)

export const underline = (text: string) => style(text, 4, 24)

export const blink = (text: string) => style(text, 5, 25)

export const blinkFast = (text: string) => style(text, 6, 25)

export const reverse = (text: string) => style(text, 7, 27)

export const hidden = (text: string) => style(text, 8, 28)

export const strike = (text: string) => style(text, 9, 29)

export const framed = (text: string) => style(text, 51, 54)

export const encircle = (text: string) => style(text, 52, 54)

export const overline = (text: string) => style(text, 53, 55)

//#endregion

//#region colors

export const black = (text: string) => style(text, fg(0), fg(9))

export const red = (text: string) => style(text, fg(1), fg(9))

export const green = (text: string) => style(text, fg(2), fg(9))

export const yellow = (text: string) => style(text, fg(3), fg(9))

export const blue = (text: string) => style(text, fg(4), fg(9))

export const magenta = (text: string) => style(text, fg(5), fg(9))

export const cyan = (text: string) => style(text, fg(6), fg(9))

export const white = (text: string) => style(text, fg(7), fg(9))

export const bgBlack = (text: string) => style(text, bg(0), bg(9))

export const bgRed = (text: string) => style(text, bg(1), bg(9))

export const bgGreen = (text: string) => style(text, bg(2), bg(9))

export const bgYellow = (text: string) => style(text, bg(3), bg(9))

export const bgBlue = (text: string) => style(text, bg(4), bg(9))

export const bgMagenta = (text: string) => style(text, bg(5), bg(9))

export const bgCyan = (text: string) => style(text, bg(6), bg(9))

export const bgWhite = (text: string) => style(text, bg(7), bg(9))

//#endregion

//#region bright colors

export const bBlack = (text: string) => style(text, bfg(0), fg(9))

export const bRed = (text: string) => style(text, bfg(1), fg(9))

export const bGreen = (text: string) => style(text, bfg(2), fg(9))

export const bYellow = (text: string) => style(text, bfg(3), fg(9))

export const bBlue = (text: string) => style(text, bfg(4), fg(9))

export const bMagenta = (text: string) => style(text, bfg(5), fg(9))

export const bCyan = (text: string) => style(text, bfg(6), fg(9))

export const bWhite = (text: string) => style(text, bfg(7), fg(9))

export const bbgBlack = (text: string) => style(text, bbg(0), bg(9))

export const bbgRed = (text: string) => style(text, bbg(1), bg(9))

export const bbgGreen = (text: string) => style(text, bbg(2), bg(9))

export const bbgYellow = (text: string) => style(text, bbg(3), bg(9))

export const bbgBlue = (text: string) => style(text, bbg(4), bg(9))

export const bbgMagenta = (text: string) => style(text, bbg(5), bg(9))

export const bbgCyan = (text: string) => style(text, bbg(6), bg(9))

export const bbgWhite = (text: string) => style(text, bbg(7), bg(9))

//#endregion

//#region custom colors

export const color = (colorCode: number | ColorName | string, text: string) => {
    if (typeof colorCode === 'string') return fromString(colorCode, text, false)
    return style(text, `${fg(8)};5;${colorCode}`, fg(9))
}

export const bgColor = (colorCode: number | ColorName | string, text: string) => {
    if (typeof colorCode === 'string') return fromString(colorCode, text, true)
    return style(text, `${bg(8)};5;${colorCode}`, bg(9))
}

function fromString(colorCode: ColorName | string, text: string, background: boolean) {
    if (colorCode.indexOf('#') === 0) return fromHex(colorCode, text, background)
    return fromName(colorCode as ColorName, text, background)
}

export const rgb = (red: number, green: number, blue: number, text: string) => style(text, `${fg(8)};2;${red};${green};${blue}`, fg(9))

export const bgRgb = (red: number, green: number, blue: number, text: string) => style(text, `${bg(8)};2;${red};${green};${blue}`, bg(9))

//#endregion

//#region Hex

function checkHex(hex: number) {
    if (hex > 255 || hex < 0) throw new Error('Invalid hex value')
}

function fromHex(hex: string, text: string, background: boolean) {
    hex = hex.slice(1)
    let rgbVals: [number, number, number] = [0, 0, 0]
    if (hex.length === 3) {
        for (let i = 0; i < hex.length; i++) {
            let val = hex[i]
            let hexVal = parseInt(val + val, 16)
            checkHex(hexVal)
            rgbVals.push(hexVal)
        }
    } else if (hex.length === 6) {
        for (let i = 1; i < hex.length; i += 2) {
            let hexVal = parseInt(hex.slice(i - 1, i), 16)
            checkHex(hexVal)
            rgbVals.push(hexVal)
        }
    } else {
        checkHex(-1)
    }
    const params: [number, number, number, string] = [rgbVals[0], rgbVals[1], rgbVals[2], text]
    return background ? bgRgb.apply(null, params) : rgb.apply(null, params)
}

//#endregion

//#region names

import { ColorName, names, } from './names'

function fromName(name: ColorName, text: string, background: boolean) {
    name = name.toLowerCase() as ColorName
    let rgbVals = names[name]
    if (rgbVals == null) throw new Error('Invalid color name')
    const params: [number, number, number, string] = [rgbVals[0], rgbVals[1], rgbVals[2], text]
    return background ? bgRgb.apply(null, params) : rgb.apply(null, params)
}

//#endregion