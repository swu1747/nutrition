export const Round2D = (n) => n === undefined ? 0 : Math.round((+n) * 100) / 100

export const percentile = (a, b) => {
    return a === undefined ? 0 : Math.round((+a / b) * 100)
}