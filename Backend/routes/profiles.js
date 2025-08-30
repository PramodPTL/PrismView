const express = require("express");
const jwt = require("jsonwebtoken");
const { pool } = require("../config/database");

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
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
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Token verification failed",
    });
  }
};

// Create a new profile
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { name, email, phone, instagram, youtube } = req.body;
    const userId = req.user.userId;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and phone are required fields",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid phone number",
      });
    }

    // Check if profile with this email already exists for this user
    const [existingProfiles] = await pool.execute(
      "SELECT id FROM profiles WHERE email = ? AND userId = ?",
      [email, userId]
    );

    if (existingProfiles.length > 0) {
      return res.status(409).json({
        success: false,
        message: "A profile with this email already exists",
      });
    }

    // Insert new profile
    const [result] = await pool.execute(
      "INSERT INTO profiles (name, email, phone, instagram, youtube, userId) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, phone, instagram || null, youtube || null, userId]
    );

    // Get the created profile
    const [profiles] = await pool.execute(
      "SELECT * FROM profiles WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profiles[0],
    });
  } catch (error) {
    console.error("Create profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Get all profiles for the authenticated user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const [profiles] = await pool.execute(
      "SELECT * FROM profiles WHERE userId = ? ORDER BY createdAt DESC",
      [userId]
    );

    res.json({
      success: true,
      data: profiles,
    });
  } catch (error) {
    console.error("Get profiles error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Get a specific profile by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const [profiles] = await pool.execute(
      "SELECT * FROM profiles WHERE id = ? AND userId = ?",
      [id, userId]
    );

    if (profiles.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.json({
      success: true,
      data: profiles[0],
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Update a profile
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const { name, email, phone, instagram, youtube } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and phone are required fields",
      });
    }

    // Check if profile exists and belongs to user
    const [existingProfiles] = await pool.execute(
      "SELECT id FROM profiles WHERE id = ? AND userId = ?",
      [id, userId]
    );

    if (existingProfiles.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Check if email is already used by another profile of the same user
    const [duplicateProfiles] = await pool.execute(
      "SELECT id FROM profiles WHERE email = ? AND userId = ? AND id != ?",
      [email, userId, id]
    );

    if (duplicateProfiles.length > 0) {
      return res.status(409).json({
        success: false,
        message: "A profile with this email already exists",
      });
    }

    // Update profile
    await pool.execute(
      "UPDATE profiles SET name = ?, email = ?, phone = ?, instagram = ?, youtube = ? WHERE id = ? AND userId = ?",
      [name, email, phone, instagram || null, youtube || null, id, userId]
    );

    // Get the updated profile
    const [profiles] = await pool.execute(
      "SELECT * FROM profiles WHERE id = ?",
      [id]
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: profiles[0],
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Delete a profile
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Check if profile exists and belongs to user
    const [existingProfiles] = await pool.execute(
      "SELECT id FROM profiles WHERE id = ? AND userId = ?",
      [id, userId]
    );

    if (existingProfiles.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Delete profile
    await pool.execute("DELETE FROM profiles WHERE id = ? AND userId = ?", [
      id,
      userId,
    ]);

    res.json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    console.error("Delete profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

module.exports = router;
