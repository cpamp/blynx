import { black, blue, green, red, white, yellow, bgBlack, bgBlue, bgGreen,
    bgRed, bgWhite, bgYellow, italic, bold, faint, underline, blink, blinkFast,
    reverse, strike, framed, encircle, overline, hidden, bgMagenta, bgCyan, magenta, cyan, color, bgColor, bBlack, bBlue, bGreen, bRed, bMagenta, bCyan, bWhite, bYellow, bbgBlack, bbgBlue, bbgGreen, bbgRed, bbgMagenta, bbgCyan, bbgWhite, bbgYellow } from '../'

function pad(text: string, num: number) {
    for (let count = num; count > 0; count--) {
        text = ' ' + text
    }
    return text.slice(-1 * num)
}

const padNum = 15

console.log(
    black(pad('black', padNum)),
    blue(pad('blue', padNum)),
    green(pad('green', padNum)),
    red(pad('red', padNum)),
    magenta(pad('magenta', padNum)),
    cyan(pad('cyan', padNum)),
    white(pad('white', padNum)),
    yellow(pad('yellow', padNum))
)

console.log(
    bBlack(pad('bBlack', padNum)),
    bBlue(pad('bBlue', padNum)),
    bGreen(pad('bGreen', padNum)),
    bRed(pad('bRed', padNum)),
    bMagenta(pad('bMagenta', padNum)),
    bCyan(pad('bCyan', padNum)),
    bWhite(pad('bWhite', padNum)),
    bYellow(pad('bYellow', padNum))
)

console.log(
    bgBlack(pad('bgBlack', padNum)),
    bgBlue(black(pad('bgBlue', padNum))),
    bgGreen(black(pad('bgGreen', padNum))),
    bgRed(black(pad('bgRed', padNum))),
    bgMagenta(black(pad('bgMagenta', padNum))),
    bgCyan(black(pad('bgCyan', padNum))),
    bgWhite(black(pad('bgWhite', padNum))),
    bgYellow(black(pad('bgYellow', padNum)))
)

console.log(
    bbgBlack(black(pad('bbgBlack', padNum))),
    bbgBlue(black(pad('bbgBlue', padNum))),
    bbgGreen(black(pad('bbgGreen', padNum))),
    bbgRed(black(pad('bbgRed', padNum))),
    bbgMagenta(black(pad('bbgMagenta', padNum))),
    bbgCyan(black(pad('bbgCyan', padNum))),
    bbgWhite(black(pad('bbgWhite', padNum))),
    bbgYellow(black(pad('bbgYellow', padNum)))
)

console.log(
    italic(pad('italic', padNum)),
    faint(pad('faint', padNum)),
    bold(pad('bold', padNum)),
    underline(pad('underline', padNum)),
    blink(pad('blink', padNum)),
    blinkFast(pad('blinkFast', padNum)),
    reverse(pad('reverse', padNum)),
    hidden(pad('hidden', padNum))
)

console.log(
    strike(pad('strike', padNum)),
    framed(pad('framed', padNum)),
    overline(pad('overline', padNum)),
    encircle(pad('encircle', padNum))
)

function print(arr: string[]) {
    if (arr.length === 16) {
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
let whiteText = [0, 16, 17, 18, 19, 232, 233, 234, 235, 236, 237]
for (let i = 0; i < 256; i++) {
    let colorFn = whiteText.indexOf(i) > -1 ? white : black
    bgColors.push(bgColor(i, colorFn(`     ${i}`.slice(-5))))
    print(bgColors)
}

console.log('\n\n')