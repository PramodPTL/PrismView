const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { pool } = require("../config/database");

const router = express.Router();

// Initialize Google OAuth client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// User signup endpoint
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const [existingUsers] = await pool.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const [result] = await pool.execute(
      "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, hashedPassword]
    );

    // Create JWT token
    const token = jwt.sign(
      { userId: result.insertId, email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Return success response
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        id: result.insertId,
        firstName,
        lastName,
        email,
        token,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// User login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user by email
    const [users] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = users[0];

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Return success response
    res.json({
      success: true,
      message: "Login successful",
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Get user profile (protected route)
router.get("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token required",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user data
    const [users] = await pool.execute(
      "SELECT id, firstName, lastName, email, createdAt FROM users WHERE id = ?",
      [decoded.userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: users[0],
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    console.error("Profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Google sign-in endpoint
router.post("/google-signin", async (req, res) => {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      return res.status(400).json({
        success: false,
        message: "Google access token is required",
      });
    }

    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: accessToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, given_name, family_name, picture, sub: googleId } = payload;

    // Check if user already exists
    let [existingUsers] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    let userId;
    let firstName = given_name || "";
    let lastName = family_name || "";

    if (existingUsers.length === 0) {
      // Create new user
      const [result] = await pool.execute(
        "INSERT INTO users (firstName, lastName, email, googleId, picture) VALUES (?, ?, ?, ?, ?)",
        [firstName, lastName, email, googleId, picture]
      );
      userId = result.insertId;
    } else {
      // Update existing user with Google info if needed
      const user = existingUsers[0];
      userId = user.id;

      if (!user.googleId) {
        await pool.execute(
          "UPDATE users SET googleId = ?, picture = ? WHERE id = ?",
          [googleId, picture, userId]
        );
      }

      firstName = user.firstName || firstName;
      lastName = user.lastName || lastName;
    }

    // Create JWT token
    const token = jwt.sign(
      { userId, email, isGoogleUser: true },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Return success response
    res.json({
      success: true,
      message: "Google sign-in successful",
      data: {
        id: userId,
        firstName,
        lastName,
        email,
        picture,
        token,
        isGoogleUser: true,
      },
    });
  } catch (error) {
    console.error("Google sign-in error:", error);
    res.status(500).json({
      success: false,
      message: "Google authentication failed",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

module.exports = router;
