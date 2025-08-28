const express = require('express');
const router = express.Router();

const demoPhotos = [
  {
    url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
    caption: 'Adorable golden retriever puppy'
  },
  {
    url: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42',
    caption: 'Playful kitten'
  },
  {
    url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e',
    caption: 'Happy dog in the park'
  }
];

router.get('/api/photos', (req, res) => {
  res.json(demoPhotos);
});

module.exports = router;