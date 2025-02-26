const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const sendReferralEmail = require("../utils/emailService");

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

    res.status(201).json({
      message: "Referral submitted successfully!",
      referral: newReferral,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { createReferral };
