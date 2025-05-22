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
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'chupahin.02c@gmail.com',
        pass: 'auax ldqj nyts yeqw',
      },
    });

    // Verify transporter configuration
    await transporter.verify();
    console.log('Transporter configured successfully');

    const mailOptions = {
      from: `"Callback" <chupahin.02c@gmail.com>`, // Updated to match user
      to: 'chupahin.02n@gmail.com',
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
    console.log('Email sent successfully');

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (err: any) {
    console.error('Send error:', err.message);
    return res.status(500).json({ message: 'Failed to send email', error: err.message });
  }
}
