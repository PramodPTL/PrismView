-- PrismView Database Setup Script
-- Run this script in your MySQL database to create the necessary tables

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS prismview_db;
USE prismview_db;

-- Create users table with Google OAuth support
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NULL, -- Made optional for Google users
  googleId VARCHAR(255) NULL, -- Google OAuth ID
  picture VARCHAR(500) NULL, -- Profile picture URL
  isGoogleUser BOOLEAN DEFAULT FALSE, -- Flag to identify Google users
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_google_id ON users(googleId);
CREATE INDEX idx_users_created_at ON users(createdAt);

-- Insert sample user (password: test123 - hashed with bcrypt)
-- INSERT INTO users (firstName, lastName, email, password) VALUES 
-- ('John', 'Doe', 'john@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8KqKqKq');

-- Show table structure
DESCRIBE users;

-- Show sample data (if any)
SELECT id, firstName, lastName, email, isGoogleUser, createdAt FROM users;
