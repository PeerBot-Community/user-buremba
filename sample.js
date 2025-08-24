// Sample JavaScript file
// This is a simple example demonstrating basic JavaScript concepts

const greeting = "Hello, World!";
const numbers = [1, 2, 3, 4, 5];

function calculateSum(arr) {
    return arr.reduce((sum, num) => sum + num, 0);
}

function displayInfo() {
    console.log(greeting);
    console.log(`Numbers: ${numbers.join(', ')}`);
    console.log(`Sum: ${calculateSum(numbers)}`);
}

// Object example
const user = {
    name: "John Doe",
    age: 30,
    email: "john@example.com",
    greet() {
        return `Hi, I'm ${this.name}`;
    }
};

// Export for potential use in other files
module.exports = {
    greeting,
    numbers,
    calculateSum,
    displayInfo,
    user
};

// Run the demo if this file is executed directly
if (require.main === module) {
    displayInfo();
    console.log(user.greet());
}