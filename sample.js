// Sample JavaScript file
console.log('Hello, World!');

// Function to calculate the sum of two numbers
function addNumbers(a, b) {
    return a + b;
}

// Function to greet a user
function greetUser(name) {
    return `Hello, ${name}! Welcome to our sample application.`;
}

// Example usage
const result = addNumbers(5, 3);
console.log(`5 + 3 = ${result}`);

const greeting = greetUser('User');
console.log(greeting);

// Export functions for use in other modules
module.exports = {
    addNumbers,
    greetUser
};