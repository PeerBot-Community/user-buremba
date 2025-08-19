# 🏠 Airbnb Clone

A full-stack Airbnb clone built with Node.js/Bun, Express.js, MongoDB, and modern web technologies.

## 🚀 Features

- **User Authentication** - Registration, login, JWT-based authentication
- **Property Management** - Create, update, delete property listings
- **Booking System** - Search, book, and manage reservations
- **Payment Integration** - Stripe payment processing
- **Image Upload** - Cloudinary integration for property photos
- **Email Notifications** - Automated booking confirmations
- **Location Services** - Google Maps integration
- **Reviews & Ratings** - User feedback system
- **Responsive Design** - Mobile-first approach

## 🛠️ Tech Stack

- **Runtime**: Bun (or Node.js)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Payment**: Stripe
- **File Storage**: Cloudinary
- **Email**: Nodemailer
- **Validation**: Express-validator

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd airbnb-clone
   ```

2. **Install dependencies**
   ```bash
   make install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   make dev
   # or
   bun run dev
   ```

## 🔧 Available Commands

```bash
make install    # Install dependencies
make dev       # Start development server
make start     # Start production server
make test      # Run tests
make lint      # Lint code
make format    # Format code
make clean     # Clean and reinstall dependencies
make deploy    # Deploy to production
make setup     # Quick setup for new environment
make help      # Show available commands
```

## 📝 Environment Variables

Copy `.env.example` to `.env` and configure the following:

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (development/production) | No |
| `PORT` | Server port | No |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `GOOGLE_MAPS_API_KEY` | Google Maps API key | Yes |

## 📂 Project Structure

```
airbnb-clone/
├── src/
│   ├── controllers/     # Request handlers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── utils/          # Utility functions
│   └── server.js       # Application entry point
├── .env.example        # Environment variables template
├── package.json        # Dependencies and scripts
├── Makefile           # Build and deployment commands
└── README.md          # Project documentation
```

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation and sanitization

## 🚀 Deployment

1. **Configure your deployment target in the Makefile**
2. **Set up production environment variables**
3. **Run deployment command**
   ```bash
   make deploy
   ```

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Properties
- `GET /api/properties` - Get all properties
- `POST /api/properties` - Create property (host only)
- `GET /api/properties/:id` - Get property details
- `PUT /api/properties/:id` - Update property (host only)
- `DELETE /api/properties/:id` - Delete property (host only)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.