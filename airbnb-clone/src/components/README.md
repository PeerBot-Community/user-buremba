# Primary Button Component

A reusable primary button component with Airbnb-style design for your web application.

## Features

- 🎨 Airbnb-inspired design with gradient background
- 📱 Responsive and accessible
- ⚡ Multiple size variants (small, default, large)
- 🔄 Loading state with spinner
- 🚫 Disabled state
- 🎯 Icon support
- 📐 Full-width option
- 🖱️ Smooth hover animations

## Files

- `Button.js` - Vanilla JavaScript implementation
- `Button.jsx` - React implementation
- `Button.css` - CSS styles for React version
- `ButtonExample.html` - Interactive demo page

## Usage

### Vanilla JavaScript

```javascript
// Initialize styles (call once)
Button.init();

// Create a basic button
const button = Button.create({
    text: 'Book Now',
    onClick: () => console.log('Clicked!')
});

// Append to DOM
document.body.appendChild(button);
```

### React

```jsx
import Button from './components/Button';

function App() {
    return (
        <Button onClick={() => console.log('Clicked!')}>
            Book Now
        </Button>
    );
}
```

## API

### Options (Vanilla JS)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `text` | string | 'Button' | Button text content |
| `size` | string | 'default' | Size variant ('small', 'default', 'large') |
| `fullWidth` | boolean | false | Make button full width |
| `disabled` | boolean | false | Disable button |
| `loading` | boolean | false | Show loading spinner |
| `icon` | string | null | Icon HTML/emoji to display |
| `onClick` | function | null | Click handler function |
| `type` | string | 'button' | Button type attribute |
| `className` | string | '' | Additional CSS classes |
| `id` | string | null | Button ID attribute |

### Props (React)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Button content |
| `size` | string | 'default' | Size variant |
| `fullWidth` | boolean | false | Make button full width |
| `disabled` | boolean | false | Disable button |
| `loading` | boolean | false | Show loading spinner |
| `icon` | ReactNode | null | Icon component to display |
| `onClick` | function | null | Click handler function |
| `type` | string | 'button' | Button type attribute |
| `className` | string | '' | Additional CSS classes |

## Examples

### Basic Button
```javascript
Button.create({ text: 'Search Properties' })
```

### Large Button with Icon
```javascript
Button.create({ 
    text: 'Book Now', 
    size: 'large',
    icon: '🏠'
})
```

### Loading State
```javascript
Button.create({ 
    text: 'Processing', 
    loading: true 
})
```

### Full Width Button
```javascript
Button.create({ 
    text: 'Reserve', 
    fullWidth: true 
})
```

## Styling

The button uses Airbnb's brand colors:
- Primary: #FF385C (Rausch)
- Hover: #E31C5F
- Active: #BC1A52

You can customize the appearance by overriding CSS variables or modifying the styles in `Button.css`.

## Demo

Open `ButtonExample.html` in your browser to see all button variants in action.