// Sample JavaScript file
// This demonstrates basic JavaScript concepts

class SampleClass {
    constructor(name) {
        this.name = name;
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
        console.log(`Added ${item} to ${this.name}'s collection`);
    }

    listItems() {
        console.log(`${this.name}'s items:`, this.items);
        return this.items;
    }

    removeItem(item) {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
            console.log(`Removed ${item} from ${this.name}'s collection`);
        }
    }
}

// Sample usage
const sampleInstance = new SampleClass("Demo");
sampleInstance.addItem("apple");
sampleInstance.addItem("banana");
sampleInstance.addItem("orange");
sampleInstance.listItems();
sampleInstance.removeItem("banana");
sampleInstance.listItems();

// Export for use in other modules
module.exports = SampleClass;