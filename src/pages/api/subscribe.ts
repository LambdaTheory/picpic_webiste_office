import type { NextApiRequest, NextApiResponse } from 'next';

interface SubscribeRequest {
  email: string;
}

interface SubscribeResponse {
  success: boolean;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubscribeResponse>,
) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email }: SubscribeRequest = req.body;

    if (!email || !email.includes('@')) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email address' });
    }

    // Google Sheets API 配置
    const { GOOGLE_SHEETS_URL } = process.env;

    if (!GOOGLE_SHEETS_URL) {
      // eslint-disable-next-line no-console
      console.error('GOOGLE_SHEETS_URL environment variable is not set');
      return res
        .status(500)
        .json({ success: false, message: 'Server configuration error' });
    }

    // 发送数据到Google Sheets
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        timestamp: new Date().toISOString(),
        source: 'landing-page-banner',
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status}`);
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed to wishlist',
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Subscription error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to subscribe. Please try again later.',
    });
  }
}
