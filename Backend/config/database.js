const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "prismview_db",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database connected successfully!");
    connection.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
};

// Initialize database tables
const initDatabase = async () => {
  try {
    const connection = await pool.getConnection();

    // Create users table with Google OAuth support
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
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
      )
    `;

    await connection.execute(createUsersTable);

    // Create profiles table
    const createProfilesTable = `
      CREATE TABLE IF NOT EXISTS profiles (
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
      )
    `;

    await connection.execute(createProfilesTable);

    // Add indexes for better performance
    try {
      await connection.execute("CREATE INDEX idx_users_email ON users(email)");
      await connection.execute(
        "CREATE INDEX idx_users_google_id ON users(googleId)"
      );
      await connection.execute(
        "CREATE INDEX idx_users_created_at ON users(createdAt)"
      );

      // Add indexes for profiles table
      await connection.execute(
        "CREATE INDEX idx_profiles_user_id ON profiles(userId)"
      );
      await connection.execute(
        "CREATE INDEX idx_profiles_email ON profiles(email)"
      );
      await connection.execute(
        "CREATE INDEX idx_profiles_created_at ON profiles(createdAt)"
      );
    } catch (indexError) {
      // Indexes might already exist, ignore errors
      console.log("ℹ️  Database indexes already exist or couldn't be created");
    }

    console.log("✅ Database tables initialized successfully!");

    connection.release();
  } catch (error) {
    console.error("❌ Database initialization failed:", error.message);
  }
};

module.exports = {
  pool,
  testConnection,
  initDatabase,
};
