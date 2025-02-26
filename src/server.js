// Load environment variables from .env file
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const referralRoutes = require("./routes/referralRoutes");

const app = express();

// Updated CORS configuration to allow local and production frontend domains
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL || "http://localhost:3000", // primary allowed URL from env or fallback
    "http://localhost:5173",
    "http://localhost:3001",
    "https://accredian-frontend-task-mhsp-335a5286w-vishalamulurus-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow cookies/auth headers if needed
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes: Use the referralRoutes for any requests to /api/referral
app.use("/api/referral", referralRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start Server on the specified PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
