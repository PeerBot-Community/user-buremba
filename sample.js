// Sample JavaScript file demonstrating basic functionality
// Created as an example file for user-U09513HH1N1

/**
 * Simple calculator class with basic operations
 */
class Calculator {
    constructor() {
        this.result = 0;
    }

    add(number) {
        this.result += number;
        return this;
    }

    subtract(number) {
        this.result -= number;
        return this;
    }

    multiply(number) {
        this.result *= number;
        return this;
    }

    divide(number) {
        if (number === 0) {
            throw new Error('Division by zero is not allowed');
        }
        this.result /= number;
        return this;
    }

    getValue() {
        return this.result;
    }

    reset() {
        this.result = 0;
        return this;
    }
}

/**
 * Utility functions
 */
const utils = {
    // Generate random number between min and max
    randomBetween: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Check if a number is prime
    isPrime: (num) => {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) {
                return false;
            }
        }
        return true;
    },

    // Format date to readable string
    formatDate: (date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
};

// Example usage
if (require.main === module) {
    console.log('=== Calculator Demo ===');
    const calc = new Calculator();
    
    const result = calc
        .add(10)
        .multiply(2)
        .subtract(5)
        .getValue();
    
    console.log(`Calculator result: ${result}`); // Should output 15
    
    console.log('\n=== Utility Functions Demo ===');
    console.log(`Random number (1-100): ${utils.randomBetween(1, 100)}`);
    console.log(`Is 17 prime? ${utils.isPrime(17)}`);
    console.log(`Current time: ${utils.formatDate(new Date())}`);
}

module.exports = { Calculator, utils };