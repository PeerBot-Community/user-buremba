// Sample JavaScript file
console.log("Hello, World!");

// Sample function
function greetUser(name) {
    return `Welcome, ${name}!`;
}

// Sample data
const users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" }
];

// Export for use in other files
module.exports = {
    greetUser,
    users
};