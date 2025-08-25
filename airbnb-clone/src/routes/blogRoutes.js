const express = require('express');
const router = express.Router();

router.get('/blog', (req, res) => {
  res.json({
    posts: [
      {
        id: 1,
        title: 'Welcome to Airbnb Hosting',
        content: 'Learn how to become a successful Airbnb host and create memorable experiences for your guests.',
        date: '2025-08-25',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'
      },
      {
        id: 2,
        title: 'Design Tips for Your Space',
        content: 'Discover the best practices for designing your space to attract more guests and improve their stay.',
        date: '2025-08-24',
        image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb'
      }
    ]
  });
});

module.exports = router;