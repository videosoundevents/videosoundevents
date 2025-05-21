// /api/send-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, phone, productName, image, price, time } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'chupahin.02c@gmail.com', // replace with your Gmail
      pass: process.env.GMAIL_APP_PASSWORD, // use App Password
    },
  });

  const mailOptions = {
    from: 'chupahin.02c@gmail.com',
    to: 'chupahin.02c@gmail.com',
    subject: `New Order from ${name}`,
    html: `
      <h2>New Product Order</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Product:</strong> ${productName}</p>
      <p><strong>Price:</strong> ${price}</p>
      <img src="${image}" alt="Product Image" width="200" />
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
}
