// File: /api/send-email.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

const handler = async (req: VercelRequest, res: VercelResponse) => {
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

    // Simulated processing: you can replace this with real email logic
    console.log('📩 New Callback Submission:', {
      name, phone, productName, image, price, time, description, productId,
    });

    // Respond success
    return res.status(200).json({ message: 'Form submitted successfully.' });
  } catch (error: any) {
    console.error('❌ send-email API Error:', error.message);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export default handler;
