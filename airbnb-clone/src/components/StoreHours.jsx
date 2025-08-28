import React from 'react';

const StoreHours = () => {
  const hours = [
    { day: 'Monday', hours: '9:00 AM - 8:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM - 8:00 PM' },
    { day: 'Wednesday', hours: '9:00 AM - 8:00 PM' },
    { day: 'Thursday', hours: '9:00 AM - 8:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 9:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 9:00 PM' },
    { day: 'Sunday', hours: '10:00 AM - 7:00 PM' }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ color: '#FF5A5F', marginBottom: '20px' }}>Store Hours</h2>
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {hours.map((item, index) => (
          <div key={item.day} style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
            backgroundColor: index % 2 === 0 ? '#f7f7f7' : '#fff',
            borderRadius: '6px'
          }}>
            <span style={{ fontWeight: '500' }}>{item.day}</span>
            <span>{item.hours}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreHours;