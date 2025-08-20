/**
 * Sample utility functions
 */

// Generate a random ID
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// Format date to readable string
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Simple validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Capitalize first letter of each word
function capitalizeWords(str) {
    return str.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
}

module.exports = {
    generateId,
    formatDate,
    isValidEmail,
    capitalizeWords
};