const nodemailer = require("nodemailer");

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

module.exports = sendReferralEmail;
