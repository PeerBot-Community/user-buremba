import React from 'react';
import '../styles/blog.css';

const Blog = () => {
  const blogPosts = [
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
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Airbnb Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map(post => (
          <div key={post.id} className="blog-post bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={post.image} alt={post.title} className="blog-image w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.content}</p>
              <p className="text-sm text-gray-500">{post.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;