require("dotenv").config();
const express = require("express");
const cors = require("cors");
const referralRoutes = require("./routes/referralRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/referral", referralRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
