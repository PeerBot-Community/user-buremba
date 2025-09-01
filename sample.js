// Sample JavaScript file
function greet(name) {
    return `Hello, ${name}! Welcome to your repository.`;
}

function calculateSum(a, b) {
    return a + b;
}

const message = greet("Developer");
const result = calculateSum(10, 25);

console.log(message);
console.log(`The sum is: ${result}`);

module.exports = {
    greet,
    calculateSum
};