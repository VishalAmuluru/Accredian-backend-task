const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Updated CORS to allow both frontend origins
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3001"],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`, req.body);
  next();
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("🚀 Backend is up and running!");
});

// New GET route for testing API connectivity
app.get("/api/your-endpoint", (req, res) => {
  res.json({ message: "API is working!" });
});

// Referral POST endpoint
app.post("/api/referrals", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  res.status(201).json({
    message: "🎉 Referral received successfully!",
    data: { name, email }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
