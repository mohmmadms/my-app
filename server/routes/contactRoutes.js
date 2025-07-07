const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// POST /api/contact
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ error: 'All fields are required.' });

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.SMTP_EMAIL, 
      subject: `📩 New message from ${name}`,
      text: `You received a new message from ${name} (${email}):\n\n${message}`,
    });

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('✉️ Email error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
