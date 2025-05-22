// File: /api/send-email.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      name,
      phone,
      productName,
      image,
      price,
      time,
      description,
      productId,
    } = req.body;

    // Log or handle the data — for now, just log it.
    console.log('Callback Form Data:', {
      name, phone, productName, image, price, time, description, productId
    });

    // Simulate email sending or external API call here

    return res.status(200).json({ message: 'Form submitted successfully.' });
  } catch (error: any) {
    console.error('API error:', error.message);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}
