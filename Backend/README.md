# PrismView Backend

This is the backend server for the PrismView application, providing user authentication and management APIs.

## Features

- User registration and login
- JWT-based authentication
- MySQL database integration
- Password hashing with bcrypt
- RESTful API endpoints

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

1. **Install MySQL** on your system if not already installed
2. **Create a MySQL database**:
   ```sql
   CREATE DATABASE prismview_db;
   ```
3. **Update the `.env` file** with your database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=prismview_db
   DB_PORT=3306
   ```

### 3. Environment Variables

Copy the `.env.example` file to `.env` and update the values:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=prismview_db
DB_PORT=3306

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret for authentication
JWT_SECRET=your_jwt_secret_key_here

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 4. Run the Application

**Development mode:**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will start on port 5000 (or the port specified in your .env file).

## API Endpoints

### Authentication

- `POST /api/users/signup` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (protected)

### Other

- `GET /` - Server status
- `GET /api/status` - API status check

## Database Schema

### Users Table

| Field     | Type         | Description                 |
| --------- | ------------ | --------------------------- |
| id        | INT          | Primary key, auto-increment |
| firstName | VARCHAR(50)  | User's first name           |
| lastName  | VARCHAR(50)  | User's last name            |
| email     | VARCHAR(100) | User's email (unique)       |
| password  | VARCHAR(255) | Hashed password             |
| createdAt | TIMESTAMP    | Account creation timestamp  |
| updatedAt | TIMESTAMP    | Last update timestamp       |

## Security Features

- Password hashing using bcrypt (12 salt rounds)
- JWT tokens with 24-hour expiration
- Input validation and sanitization
- SQL injection prevention using parameterized queries
- CORS configuration for frontend security

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

## Development

- Uses nodemon for automatic server restart during development
- Environment-specific error details (detailed errors only in development)
- Comprehensive logging for debugging

## Troubleshooting

### Common Issues

1. **Database Connection Failed**

   - Check MySQL service is running
   - Verify database credentials in .env file
   - Ensure database exists

2. **Port Already in Use**

   - Change PORT in .env file
   - Kill process using the port: `npx kill-port 5000`

3. **JWT Errors**
   - Ensure JWT_SECRET is set in .env
   - Check token expiration

### Logs

Check the console output for:

- Database connection status
- Server startup messages
- API request logs
- Error details
