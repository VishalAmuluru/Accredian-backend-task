require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

const prisma = new PrismaClient();

// Email service function
const sendReferralEmail = async (referrerEmail, refereeEmail, referrerName, refereeName) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: refereeEmail,
      subject: "Referral Invitation",
      text: `Hi ${refereeName},\n\n${referrerName} has referred you! Join us today.\n\nBest,\nAccredian Team`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Referral email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Referral controller function
const createReferral = async (req, res) => {
  try {
    const { referrerName, referrerEmail, refereeName, refereeEmail } = req.body;

    if (!referrerName || !referrerEmail || !refereeName || !refereeEmail) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newReferral = await prisma.referral.create({
      data: { referrerName, referrerEmail, refereeName, refereeEmail },
    });

    await sendReferralEmail(referrerEmail, refereeEmail, referrerName, refereeName);

    return res.status(201).json({
      message: "Referral submitted successfully!",
      referral: newReferral,
    });
  } catch (error) {
    console.error("Error in createReferral:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// CORS configuration
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:3001",
      "https://accredian-frontend-task-mhsp.vercel.app",
      "https://accredian-frontend-task-mhsp-335a5286w-vishalamulurus-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`, req.body);
  next();
});

// Routes
app.get("/", (req, res) => {
  res.status(200).send("🚀 Backend is up and running!");
});

app.get("/api/your-endpoint", (req, res) => {
  res.json({ message: "API is working!" });
});

app.post("/api/referrals", createReferral);

// 404 handler for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
