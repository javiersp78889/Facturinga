export const generateNumber = () => {
    const number = Math.floor(100000 + Math.random() * 900000)
    return String(number)
}