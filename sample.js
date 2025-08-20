// Sample JavaScript file
// This file demonstrates basic JavaScript concepts

const greeting = "Hello, World!";

function calculateSum(a, b) {
    return a + b;
}

function displayMessage(name) {
    return `Welcome to the sample project, ${name}!`;
}

class SampleClass {
    constructor(value) {
        this.value = value;
    }
    
    getValue() {
        return this.value;
    }
    
    setValue(newValue) {
        this.value = newValue;
    }
}

// Example usage
console.log(greeting);
console.log(calculateSum(5, 3));
console.log(displayMessage("User"));

const sample = new SampleClass("test value");
console.log(sample.getValue());

module.exports = {
    calculateSum,
    displayMessage,
    SampleClass
};