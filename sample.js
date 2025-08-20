// Sample JavaScript file
// This is a simple example demonstrating basic JavaScript concepts

class SampleClass {
    constructor(name) {
        this.name = name;
        this.created = new Date();
    }

    greet() {
        return `Hello, ${this.name}! Created on ${this.created.toDateString()}`;
    }

    static info() {
        return "This is a sample class for demonstration purposes";
    }
}

// Sample function
function calculateSum(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
}

// Sample usage
const sample = new SampleClass("World");
console.log(sample.greet());
console.log(SampleClass.info());

const numbers = [1, 2, 3, 4, 5];
console.log(`Sum of [${numbers.join(', ')}] = ${calculateSum(numbers)}`);

module.exports = { SampleClass, calculateSum };