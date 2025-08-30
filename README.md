# PrismView

A modern web application for managing user profiles with a beautiful dashboard interface, built with React frontend and Node.js backend with MySQL database.

## 🚀 Features

### Core Functionality

- **User Authentication**: Secure login/signup system with JWT tokens
- **Google OAuth Integration**: Sign in with Google accounts
- **Profile Management**: Create, read, update, and delete user profiles
- **Dashboard Interface**: Modern, responsive design with Tailwind CSS
- **Real-time Updates**: Dynamic profile list with automatic refresh

### Profile Features

- **Basic Information**: Name, email, and phone number
- **Social Media Links**: Instagram and YouTube profile links (optional)
- **User Association**: Profiles are linked to authenticated users
- **Data Validation**: Input validation for email and phone formats
- **CRUD Operations**: Full create, read, update, and delete functionality

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API requests

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MySQL** - Relational database
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Google OAuth** - Third-party authentication

### Database

- **MySQL 8.0+** - Primary database
- **Connection Pooling** - Efficient database connections
- **Foreign Key Constraints** - Data integrity
- **Indexed Queries** - Performance optimization

## 📁 Project Structure

```
PrismView/
├── Backend/                 # Node.js backend server
│   ├── config/             # Database configuration
│   ├── routes/             # API route handlers
│   ├── index.js            # Main server file
│   └── package.json        # Backend dependencies
├── Frontend/               # React frontend application
│   ├── src/
│   │   ├── Components/     # Reusable UI components
│   │   ├── Pages/          # Page components
│   │   ├── services/       # API service functions
│   │   └── main.jsx        # Application entry point
│   ├── index.html          # HTML template
│   └── package.json        # Frontend dependencies
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- MySQL 8.0+
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd PrismView
   ```

2. **Backend Setup**

   ```bash
   cd Backend
   npm install
   ```

3. **Database Configuration**

   - Create a MySQL database named `prismview_db`
   - Update database credentials in `Backend/config/database.js` or set environment variables:
     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_password
     DB_NAME=prismview_db
     DB_PORT=3306
     ```

4. **Environment Variables**
   Create a `.env` file in the Backend directory:

   ```env
   JWT_SECRET=your_jwt_secret_key
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   PORT=5000
   ```

5. **Frontend Setup**
   ```bash
   cd Frontend
   npm install
   ```

### Running the Application

1. **Start Backend Server**

   ```bash
   cd Backend
   npm start
   ```

   Server will run on http://localhost:5000

2. **Start Frontend Development Server**

   ```bash
   cd Frontend
   npm run dev
   ```

   Frontend will run on http://localhost:5173

3. **Access the Application**
   Open http://localhost:5173 in your browser

## 📊 Database Schema

### Users Table

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NULL,
  googleId VARCHAR(255) NULL,
  picture VARCHAR(500) NULL,
  isGoogleUser BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Profiles Table

```sql
CREATE TABLE profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  instagram VARCHAR(255) NULL,
  youtube VARCHAR(255) NULL,
  userId INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

## 🔌 API Endpoints

### Authentication

- `POST /api/users/signup` - User registration
- `POST /api/users/login` - User login
- `POST /api/users/google-signin` - Google OAuth sign-in
- `GET /api/users/profile` - Get user profile (protected)

### Profiles

- `POST /api/profiles` - Create new profile (protected)
- `GET /api/profiles` - Get all user profiles (protected)
- `GET /api/profiles/:id` - Get specific profile (protected)
- `PUT /api/profiles/:id` - Update profile (protected)
- `DELETE /api/profiles/:id` - Delete profile (protected)

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. **Login/Signup**: Users authenticate and receive a JWT token
2. **Token Storage**: Tokens are stored in localStorage
3. **Protected Routes**: API endpoints require valid JWT tokens
4. **Auto-include**: Tokens are automatically included in API requests

## 🎨 UI Components

### AddProfile

- Clickable card with plus icon
- Opens profile creation popup
- Triggers profile list refresh on creation

### AddProfilePopup

- Two-tab form (Basic & Contact)
- Form validation for required fields
- Loading states and error handling
- Responsive design with Tailwind CSS

### ProfilesList

- Displays all user profiles
- Delete functionality with confirmation
- Refresh button for manual updates
- Empty state with helpful messaging
- Social media link handling

## 🧪 Testing

### Backend Testing

- Test database connection: `GET /api/status`
- Verify server is running: `GET /`

### Frontend Testing

- Components render correctly
- Form validation works
- API calls succeed
- Error handling displays properly

## 🚀 Deployment

### Backend Deployment

1. Set production environment variables
2. Use PM2 or similar process manager
3. Configure reverse proxy (Nginx/Apache)
4. Set up SSL certificates

### Frontend Deployment

1. Build production bundle: `npm run build`
2. Deploy to static hosting (Vercel, Netlify, etc.)
3. Configure API base URL for production

### Database Deployment

1. Use managed MySQL service (AWS RDS, Google Cloud SQL)
2. Configure connection pooling
3. Set up automated backups
4. Monitor performance metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the code examples

## 🔮 Future Enhancements

- [ ] Profile editing functionality
- [ ] Profile search and filtering
- [ ] Bulk profile operations
- [ ] Profile templates
- [ ] Advanced validation rules
- [ ] Profile analytics
- [ ] Export/import functionality
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Mobile app version

## 📊 Performance

- Database connection pooling for efficient queries
- Indexed database fields for fast searches
- Optimized React components with proper state management
- Lazy loading for better user experience
- Responsive design for all device sizes

---

**Built with ❤️ using modern web technologies**
