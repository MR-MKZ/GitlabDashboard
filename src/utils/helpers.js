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
    return isNaN(result) ? 0 : result.toFixed((2));
}

export function sum(numbers) {
    let sum = 0;
    numbers.map((num) => {
        if (typeof num == "number") {
            sum += num
        }
    })
    return isNaN(sum) ? 0 : sum.toFixed(2);
}

export function getWeekRange(endDateInput) {  
    const endDate = new Date(endDateInput);  

    // Set to the last day of the week (Sunday)  
    const startOfWeek = new Date(endDate);  
    startOfWeek.setDate(endDate.getDate() - (endDate.getDay() === 0 ? 0 : endDate.getDay())); // Sunday is 0  
    
    // Subtract 7 days from the startOfWeek to get a week ago  
    startOfWeek.setDate(startOfWeek.getDate() - 6);  

    const options = { month: 'short', day: 'numeric' };  
    const startFormatted = startOfWeek.toLocaleDateString('en-US', options);  
    const endFormatted = endDate.toLocaleDateString('en-US', options);  

    return `${startFormatted} - ${endFormatted}`;  
}  