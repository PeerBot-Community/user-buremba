/**
 * Sample utility functions for common operations
 */

// String utilities
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function slugify(str) {
    return str
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
}

// Array utilities
function removeDuplicates(arr) {
    return [...new Set(arr)];
}

function groupBy(arr, key) {
    return arr.reduce((groups, item) => {
        const group = item[key];
        groups[group] = groups[group] || [];
        groups[group].push(item);
        return groups;
    }, {});
}

// Date utilities
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Number utilities
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        capitalizeFirst,
        slugify,
        removeDuplicates,
        groupBy,
        formatDate,
        formatCurrency
    };
}

// Example usage
console.log('Sample Utils Examples:');
console.log('capitalizeFirst("hello world"):', capitalizeFirst("hello world"));
console.log('slugify("My Blog Post Title"):', slugify("My Blog Post Title"));
console.log('removeDuplicates([1,2,2,3]):', removeDuplicates([1,2,2,3]));
console.log('formatCurrency(1234.56):', formatCurrency(1234.56));