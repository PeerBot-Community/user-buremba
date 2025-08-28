import React from 'react';

const PhotoGallery = ({ photos }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '1rem',
      padding: '1rem'
    }}>
      {photos?.map((photo, index) => (
        <div key={index} style={{
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <img 
            src={photo.url} 
            alt={photo.caption || `Pet photo ${index + 1}`}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover'
            }}
          />
          {photo.caption && (
            <p style={{
              margin: '0.5rem',
              fontSize: '0.9rem',
              color: '#666'
            }}>
              {photo.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;