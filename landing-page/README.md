# TechFlow Landing Page

A modern, responsive landing page built with HTML, CSS, and JavaScript.

## Features

- 🎨 Modern, clean design with gradient accents
- 📱 Fully responsive across all devices
- ⚡ Smooth animations and transitions
- 🎯 Interactive elements and hover effects
- 📧 Contact form with validation
- 🚀 Fast loading and optimized performance
- 🌙 Professional color scheme
- 📊 Stats counters with animation
- 💳 Pricing tables
- 📋 Feature showcase

## Quick Start

1. **Clone and navigate to the project:**
   ```bash
   cd landing-page
   ```

2. **Start the development server:**
   ```bash
   make serve
   ```
   
   The site will be available at `http://localhost:8080`

## Available Commands

- `make serve` - Start local development server
- `make build` - Build for production
- `make deploy-github` - Deploy to GitHub Pages
- `make deploy-netlify` - Deploy to Netlify
- `make deploy-vercel` - Deploy to Vercel
- `make validate` - Validate HTML/CSS
- `make clean` - Clean build artifacts
- `make help` - Show all available commands

## Deployment Options

### GitHub Pages
```bash
make deploy-github
```

### Netlify
```bash
make deploy-netlify
```

### Vercel
```bash
make deploy-vercel
```

### Manual Deployment
Simply upload all files to any web server or hosting provider.

## Project Structure

```
landing-page/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css       # Styles and responsive design
│   ├── js/
│   │   └── script.js       # Interactive functionality
│   └── images/             # Image assets (empty, ready for use)
├── Makefile                # Build and deployment commands
└── README.md               # This file
```

## Customization

### Colors
The main brand colors are defined in CSS variables:
- Primary: `#667eea` (blue)
- Secondary: `#764ba2` (purple)
- Gradients throughout use these colors

### Content
- Edit `index.html` to change text, sections, and structure
- Update the company name, features, pricing, and contact information
- Modify the hero section to match your brand

### Styling  
- `assets/css/style.css` contains all styles
- Responsive breakpoints: 768px (tablet), 480px (mobile)
- Uses CSS Grid and Flexbox for layout

### JavaScript Features
- Mobile navigation toggle
- Smooth scrolling navigation
- Scroll-triggered animations
- Form validation and submission
- Counter animations for stats
- Parallax effects

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest) 
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized CSS with efficient selectors
- Minimal JavaScript footprint
- Google Fonts with preconnect for faster loading
- Semantic HTML for better SEO
- Lazy loading ready for images

## License

This project is open source and available under the [MIT License](LICENSE).