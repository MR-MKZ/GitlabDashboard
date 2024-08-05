/**
 * calculate percent to number and number to percent
 * @param {string} mode "ntp" -> Number to percent, "ptn" -> Percent to number.
 * @param {number} num1 
 * @param {number} num2 
 */
export function calcPercent(mode, num1, num2) {
    let result;
    if (mode === "ntp") {
        result = (num1 / num2) * 100
    } else {
        result = (num1 / 100) * num2 
    }
    return isNaN(result) ? 0 : result;
}

export function sum(numbers) {
    let sum = 0;
    numbers.map((num) => {
        if (typeof num == "number") {
            sum += num
        }
    })
    return isNaN(sum) ? 0 : sum;
}