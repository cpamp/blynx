import { black, blue, green, red, white, yellow, bgBlack, bgBlue, bgGreen,
    bgRed, bgWhite, bgYellow, italic, bold, faint, underline, blink, blinkFast,
    reverse, strike, framed, encircle, overline, hidden, bgMagenta, bgCyan, magenta, cyan, color, bgColor, bBlack, bBlue, bGreen, bRed, bMagenta, bCyan, bWhite, bYellow, bbgBlack, bbgBlue, bbgGreen, bbgRed, bbgMagenta, bbgCyan, bbgWhite, bbgYellow, rgb, bgRgb } from '../'

function pad(text: string, num: number) {
    for (let count = num; count > 0; count--) {
        text = ' ' + text
    }
    return text.slice(-1 * num)
}

const padNum = 18

console.log(
    black(pad('black', padNum)),
    red(pad('red', padNum)),
    green(pad('green', padNum)),
    blue(pad('blue', padNum)),
    magenta(pad('magenta', padNum)),
    yellow(pad('yellow', padNum)),
    cyan(pad('cyan', padNum)),
    white(pad('white', padNum))
)

console.log(
    bBlack(pad('bBlack', padNum)),
    bRed(pad('bRed', padNum)),
    bGreen(pad('bGreen', padNum)),
    bBlue(pad('bBlue', padNum)),
    bMagenta(pad('bMagenta', padNum)),
    bYellow(pad('bYellow', padNum)),
    bCyan(pad('bCyan', padNum)),
    bWhite(pad('bWhite', padNum))
)

console.log(
    bgBlack(pad('bgBlack', padNum)),
    bgRed(black(pad('bgRed', padNum))),
    bgGreen(black(pad('bgGreen', padNum))),
    bgBlue(black(pad('bgBlue', padNum))),
    bgMagenta(black(pad('bgMagenta', padNum))),
    bgYellow(black(pad('bgYellow', padNum))),
    bgCyan(black(pad('bgCyan', padNum))),
    bgWhite(black(pad('bgWhite', padNum)))
)

console.log(
    bbgBlack(black(pad('bbgBlack', padNum))),
    bbgRed(black(pad('bbgRed', padNum))),
    bbgGreen(black(pad('bbgGreen', padNum))),
    bbgBlue(black(pad('bbgBlue', padNum))),
    bbgMagenta(black(pad('bbgMagenta', padNum))),
    bbgYellow(black(pad('bbgYellow', padNum))),
    bbgCyan(black(pad('bbgCyan', padNum))),
    bbgWhite(black(pad('bbgWhite', padNum)))
)

console.log(
    rgb(0, 0, 0, pad('rgb(0,0,0)', padNum)),
    rgb(255, 0, 0, pad('rgb(255,0,0)', padNum)),
    rgb(0, 255, 0, pad('rgb(0,255,0)', padNum)),
    rgb(0, 0, 255, pad('rgb(0,0,255)', padNum)),
    rgb(255, 0, 255, pad('rgb(255,0,255)', padNum)),
    rgb(255, 255, 0, pad('rgb(255,255,0)', padNum)),
    rgb(0, 255, 255, pad('rgb(0,255,255)', padNum)),
    rgb(255, 255, 255, pad('rgb(255,255,255)', padNum))
)


console.log(
    bgRgb(0, 0, 0, pad('bgRgb(0,0,0)', padNum)),
    bgRgb(255, 0, 0, black(pad('bgRgb(255,0,0)', padNum))),
    bgRgb(0, 255, 0, black(pad('bgRgb(0,255,0)', padNum))),
    bgRgb(0, 0, 255, pad('bgRgb(0,0,255)', padNum)),
    bgRgb(255, 0, 255, black(pad('bgRgb(255,0,255)', padNum))),
    bgRgb(255, 255, 0, black(pad('bgRgb(255,255,0', padNum))),
    bgRgb(0, 255, 255, black(pad('bgRgb(0,255,255)', padNum))),
    bgRgb(255, 255, 255, black(pad('bgRgb(255,255,255)', padNum)))
)

console.log(
    italic(pad('italic', padNum)),
    faint(pad('faint', padNum)),
    bold(pad('bold', padNum)),
    underline(pad('underline', padNum)),
    blink(pad('blink', padNum)),
    blinkFast(pad('blinkFast', padNum))
)

console.log(
    strike(pad('strike', padNum)),
    framed(pad('framed', padNum)),
    overline(pad('overline', padNum)),
    encircle(pad('encircle', padNum)),
    reverse(pad('reverse', padNum)),
    hidden(pad('hidden', padNum))
)

function print(arr: string[]) {
    if (arr.length === 32) {
        console.log(...arr)
        arr.splice(0)
    }
}

console.log('\ncolor(n):')
let fgColors = []
for (let i = 0; i < 256; i++) {
    fgColors.push(color(i, `     ${i}`.slice(-5)))
    print(fgColors)
}

console.log('\nbgColor(n):')
let bgColors = []
let whiteText = [0, 16, 17, 18, 19, 20, 21, 232, 233, 234, 235, 236, 237]
for (let i = 0; i < 256; i++) {
    let colorFn = whiteText.indexOf(i) > -1 ? white : black
    bgColors.push(bgColor(i, colorFn(`     ${i}`.slice(-5))))
    print(bgColors)
}

console.log('\n\n')