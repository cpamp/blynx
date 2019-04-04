export const getName = (function () {
    let names: {[name: string]: number} = Object.create(null)
    return function (description: string) {
        if (names[description] == null) names[description] = 0
        return `@@${description}${names[description]++ || ''}`
    }
})()