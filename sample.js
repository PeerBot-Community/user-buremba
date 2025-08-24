// Sample JavaScript file
const greeting = "Hello, World!";

function displayGreeting() {
    console.log(greeting);
    return greeting;
}

function calculateSum(a, b) {
    return a + b;
}

const sampleData = {
    name: "Sample Project",
    version: "1.0.0",
    description: "This is a sample file created for demonstration purposes"
};

// Export functions for use in other files
module.exports = {
    displayGreeting,
    calculateSum,
    sampleData
};

// Run the greeting function if this file is executed directly
if (require.main === module) {
    displayGreeting();
    console.log("Sum of 5 + 3 =", calculateSum(5, 3));
    console.log("Sample data:", sampleData);
}