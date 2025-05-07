# Activity Booking API

A RESTful API for booking activities built with Node.js, Express.js, and MongoDB.

## Features

- User registration and authentication with JWT
- List available activities
- Book activities
- View user's bookings
- Input validation
- Password hashing
- Protected routes

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd activity-booking-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/activity-booking
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=24h
```

4. Start the server:
```bash
npm start
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Activities
- GET `/api/activities` - Get all activities
- POST `/api/activities` - Create new activity (protected)

### Bookings
- POST `/api/bookings` - Book an activity (protected)
- GET `/api/bookings/my-bookings` - Get user's bookings (protected)

## Request Examples

### Register User
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "1234567890",
  "password": "password123"
}
```

### Login User
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Activity
```json
POST /api/activities
{
  "title": "Cricket Match",
  "description": "Weekend cricket match",
  "location": "Central Park",
  "dateTime": "2024-03-15T14:00:00Z"
}
```

### Book Activity
```json
POST /api/bookings
{
  "activityId": "activity_id_here"
}
```

## Error Handling

The API uses proper error handling and returns appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## Security Features

- Password hashing using bcrypt
- JWT authentication
- Input validation using express-validator
- Protected routes for authenticated users only 