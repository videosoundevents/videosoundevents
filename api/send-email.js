// File: /api/send-email.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, phone, productName, time, description } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Callback" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `New request: ${productName}`,
      text: `Name: ${name}\nPhone: ${phone}\nProduct: ${productName}\nTime: ${time}\nDescription: ${description}`,
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Send error:', err);
    return res.status(500).json({ message: 'Failed to send email' });
  }
}
