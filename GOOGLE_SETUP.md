# Google Sign-In Setup Guide for PrismView

This guide will help you set up Google Sign-In for your PrismView application.

## Prerequisites

- Google Cloud Console account
- MySQL database
- Node.js and npm installed

## Step 1: Set up Google OAuth 2.0

### 1.1 Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google OAuth2 API

### 1.2 Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required information:
   - App name: PrismView
   - User support email: your-email@domain.com
   - Developer contact information: your-email@domain.com
4. Add scopes: `openid`, `email`, `profile`
5. Add test users if needed

### 1.3 Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized JavaScript origins:
   - `http://localhost:5173` (for development)
   - `http://localhost:3000` (if using different port)
5. Add authorized redirect URIs:
   - `http://localhost:5173`
   - `http://localhost:3000`
6. Copy the Client ID

## Step 2: Configure Environment Variables

### 2.1 Backend Configuration

Create a `.env` file in the `Backend` directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_db_password
DB_NAME=prismview_db
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 2.2 Frontend Configuration

Update `Frontend/src/config/google.js` with your actual Google Client ID:

```javascript
export const GOOGLE_CLIENT_ID =
  "your_actual_google_client_id.apps.googleusercontent.com";

export const GOOGLE_CONFIG = {
  clientId: GOOGLE_CLIENT_ID,
  scope: "openid email profile",
  redirectUri: window.location.origin,
};
```

## Step 3: Database Setup

### 3.1 Run Database Migration

The application will automatically create the necessary tables when it starts. The new schema includes:

- `googleId`: Google OAuth ID
- `picture`: Profile picture URL
- `isGoogleUser`: Flag to identify Google users
- `password`: Made optional for Google users

### 3.2 Manual Database Setup (Optional)

If you prefer to set up the database manually, run the SQL commands in `Backend/database_setup.sql`.

## Step 4: Install Dependencies

### 4.1 Frontend Dependencies

```bash
cd Frontend
npm install @react-oauth/google jwt-decode
```

### 4.2 Backend Dependencies

```bash
cd Backend
npm install google-auth-library
```

## Step 5: Start the Application

### 5.1 Start Backend

```bash
cd Backend
npm run dev
```

### 5.2 Start Frontend

```bash
cd Frontend
npm run dev
```

## Step 6: Test Google Sign-In

1. Open your application in the browser
2. Click "Sign in with Google"
3. Complete the Google OAuth flow
4. Verify that the user is created in your database
5. Check that the profile picture and Google account indicator appear

## Features Implemented

- ✅ Google OAuth 2.0 integration
- ✅ Automatic user creation for new Google users
- ✅ Profile picture display from Google
- ✅ Google account indicator in profile
- ✅ JWT token generation for Google users
- ✅ Database schema updates for Google support
- ✅ Error handling and validation

## Security Considerations

1. **JWT Secret**: Use a strong, unique JWT secret in production
2. **HTTPS**: Always use HTTPS in production
3. **Client ID**: Keep your Google Client ID secure
4. **Token Validation**: Google tokens are verified on the backend
5. **Database**: Use strong database passwords

## Troubleshooting

### Common Issues

1. **"Invalid Client ID" Error**

   - Verify your Google Client ID in both frontend and backend
   - Check that the OAuth consent screen is properly configured

2. **CORS Errors**

   - Ensure your backend CORS settings include your frontend URL
   - Check that the ports match your configuration

3. **Database Connection Issues**

   - Verify database credentials in `.env`
   - Ensure MySQL is running
   - Check database permissions

4. **Google Sign-In Button Not Working**
   - Verify `@react-oauth/google` is installed
   - Check browser console for JavaScript errors
   - Ensure GoogleOAuthProvider wraps your app

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` in your backend `.env` file.

## Production Deployment

1. Update Google OAuth redirect URIs to your production domain
2. Use environment-specific configuration files
3. Set up proper SSL certificates
4. Configure production database with appropriate security
5. Use strong, unique JWT secrets
6. Set up proper logging and monitoring

## Support

If you encounter issues:

1. Check the browser console for frontend errors
2. Check the backend console for server errors
3. Verify all environment variables are set correctly
4. Ensure all dependencies are installed
5. Check Google Cloud Console for OAuth configuration issues

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [@react-oauth/google Documentation](https://github.com/MomenSherif/react-oauth)
- [Google Auth Library for Node.js](https://github.com/googleapis/google-auth-library-nodejs)
