require("dotenv").config();
const express = require("express");
const cors = require("cors");
const referralRoutes = require("./routes/referralRoutes");

const app = express();

const corsOptions = {
  origin: [
    process.env.FRONTEND_URL || "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:3001",
    "https://accredian-frontend-task-mhsp.vercel.app",
    "https://accredian-frontend-task-mhsp-335a5286w-vishalamulurus-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", referralRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
