// Book Now Button JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Get DOM elements
    const bookNowBtn = document.getElementById('book-now-btn');
    const modal = document.getElementById('booking-modal');
    const closeButton = document.querySelector('.close-button');
    const bookingForm = document.getElementById('booking-form');
    
    // Open modal when Book Now button is clicked
    bookNowBtn.addEventListener('click', function() {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('check-in').min = today;
        document.getElementById('check-out').min = today;
    });
    
    // Close modal when X button is clicked
    closeButton.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking outside of modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
    
    // Function to close modal
    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
        bookingForm.reset(); // Clear form
    }
    
    // Handle check-in date change to update check-out minimum
    document.getElementById('check-in').addEventListener('change', function() {
        const checkInDate = this.value;
        const checkOutInput = document.getElementById('check-out');
        
        if (checkInDate) {
            // Set check-out minimum to the day after check-in
            const checkInDateObj = new Date(checkInDate);
            checkInDateObj.setDate(checkInDateObj.getDate() + 1);
            const minCheckOut = checkInDateObj.toISOString().split('T')[0];
            checkOutInput.min = minCheckOut;
            
            // Clear check-out if it's before the new minimum
            if (checkOutInput.value && checkOutInput.value <= checkInDate) {
                checkOutInput.value = '';
            }
        }
    });
    
    // Handle form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const bookingData = {
            checkIn: formData.get('checkIn'),
            checkOut: formData.get('checkOut'),
            guests: formData.get('guests')
        };
        
        // Validate dates
        if (!validateBookingDates(bookingData.checkIn, bookingData.checkOut)) {
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-booking-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        // Simulate booking submission (replace with actual API call)
        submitBooking(bookingData)
            .then(response => {
                showSuccessMessage(bookingData);
                closeModal();
            })
            .catch(error => {
                showErrorMessage(error.message);
            })
            .finally(() => {
                // Restore button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
    
    // Validate booking dates
    function validateBookingDates(checkIn, checkOut) {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (checkInDate < today) {
            showErrorMessage('Check-in date cannot be in the past.');
            return false;
        }
        
        if (checkOutDate <= checkInDate) {
            showErrorMessage('Check-out date must be after check-in date.');
            return false;
        }
        
        return true;
    }
    
    // Submit booking function (replace with actual API endpoint)
    async function submitBooking(bookingData) {
        return new Promise((resolve, reject) => {
            // Simulate API call delay
            setTimeout(() => {
                // Simulate success/failure randomly for demo
                if (Math.random() > 0.1) { // 90% success rate
                    resolve({
                        success: true,
                        bookingId: 'BK' + Date.now(),
                        message: 'Booking confirmed successfully!'
                    });
                } else {
                    reject(new Error('Sorry, this property is no longer available for your selected dates.'));
                }
            }, 2000);
        });
        
        // Uncomment and modify for actual API integration:
        /*
        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData)
            });
            
            if (!response.ok) {
                throw new Error('Booking failed. Please try again.');
            }
            
            return await response.json();
        } catch (error) {
            throw error;
        }
        */
    }
    
    // Show success message
    function showSuccessMessage(bookingData) {
        const checkIn = new Date(bookingData.checkIn).toLocaleDateString();
        const checkOut = new Date(bookingData.checkOut).toLocaleDateString();
        
        alert(`🎉 Booking Confirmed!\n\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${bookingData.guests}\n\nYou will receive a confirmation email shortly.`);
    }
    
    // Show error message
    function showErrorMessage(message) {
        alert(`❌ ${message}`);
    }
    
    // Add button click animation
    bookNowBtn.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(1px)';
    });
    
    bookNowBtn.addEventListener('mouseup', function() {
        this.style.transform = '';
    });
    
    // Add subtle hover effect for better UX
    bookNowBtn.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.6s ease-in-out';
    });
    
    bookNowBtn.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

// Add pulse animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);