import './App.css'

function App() {
  return (
    <div className="pet-store">
      <header className="hero">
        <div className="container">
          <h1>🐾 Paws & Claws Pet Store</h1>
          <p className="hero-subtitle">Everything your furry friends need, delivered with love</p>
          <button className="cta-button">Shop Now</button>
        </div>
      </header>

      <section className="features">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🎯</div>
              <h3>Premium Quality</h3>
              <p>Only the best products for your beloved pets</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Same-day delivery in most areas</p>
            </div>
            <div className="feature">
              <div className="feature-icon">💝</div>
              <h3>Expert Care</h3>
              <p>Professional advice from pet specialists</p>
            </div>
          </div>
        </div>
      </section>

      <section className="products">
        <div className="container">
          <h2>Popular Products</h2>
          <div className="product-grid">
            <div className="product-card">
              <div className="product-image">🦴</div>
              <h3>Premium Dog Food</h3>
              <p>Nutritious meals for healthy dogs</p>
              <span className="price">$29.99</span>
            </div>
            <div className="product-card">
              <div className="product-image">🐱</div>
              <h3>Cat Toys & Treats</h3>
              <p>Keep your cats entertained and happy</p>
              <span className="price">$15.99</span>
            </div>
            <div className="product-card">
              <div className="product-image">🐦</div>
              <h3>Bird Accessories</h3>
              <p>Everything for your feathered friends</p>
              <span className="price">$22.50</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Paws & Claws Pet Store. Made with ❤️ for pets everywhere.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
