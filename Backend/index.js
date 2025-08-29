const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend
app.use(
  cors({
    origin: "http://localhost:5173", // Vite dev server default port
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// API endpoint for testing connection
app.get("/api/status", (req, res) => {
  res.json({
    status: "success",
    message: "Backend is connected!",
    timestamp: new Date().toISOString(),
  });
});

// Example API endpoint for user data
app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`Frontend can connect at: http://localhost:${PORT}`);
});
