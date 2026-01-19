const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'okj002608@gmail.com', // ⚠️ REPLACE WITH YOUR GMAIL
    pass: 'udrlqqewmxzvaurm'             // ✅ Your provided passkey
  }
});

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: '"FitFare Security" <no-reply@fitfare.com>',
      to,
      subject,
      html
    });
    console.log(`Email sent to ${to}`);
    return true;
  } catch (error) {
    console.error("Email Error:", error);
    return false;
  }
};

module.exports = sendEmail;