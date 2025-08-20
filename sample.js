// Sample JavaScript file
// This is a basic example demonstrating common JavaScript concepts

class SampleClass {
    constructor(name) {
        this.name = name;
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
        console.log(`Added ${item} to ${this.name}`);
    }

    getItems() {
        return this.items;
    }

    displayInfo() {
        console.log(`Name: ${this.name}`);
        console.log(`Items: ${this.items.join(', ')}`);
    }
}

// Example usage
const sample = new SampleClass('My Sample Object');
sample.addItem('First Item');
sample.addItem('Second Item');
sample.displayInfo();

// Export for use in other files
module.exports = SampleClass;