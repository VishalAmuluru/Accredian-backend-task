const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3001",
    "https://accredian-frontend-task-mhsp.vercel.app",
    "https://accredian-frontend-task-mhsp-335a5286w-vishalamulurus-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`, req.body);
  next();
});

app.get("/", (req, res) => {
  res.send("🚀 Backend is up and running!");
});

app.get("/api/your-endpoint", (req, res) => {
  res.json({ message: "API is working!" });
});

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

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
