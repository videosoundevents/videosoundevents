// File: /pages/api/send-email.ts

import nodemailer from 'nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Incoming request:', req.method); // ✅ Basic log

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, phone, productName, time, description } = req.body;

    if (!name || !phone || !productName || !time) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Callback" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `New request: ${productName}`,
      text: `
        Name: ${name}
        Phone: ${phone}
        Product: ${productName}
        Time: ${time}
        Description: ${description || 'No description'}
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (err: any) {
    console.error('Send error:', err.message);
    return res.status(500).json({ message: 'Failed to send email', error: err.message });
  }
}
