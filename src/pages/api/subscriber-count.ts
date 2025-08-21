import type { NextApiRequest, NextApiResponse } from 'next';

interface SubscriberCountResponse {
  success: boolean;
  count: number;
  message?: string;
}

// 模拟数据存储 - 在实际应用中，这应该从数据库或Google Sheets获取
let subscriberCount = 2847; // 初始值

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubscriberCountResponse>,
) {
  if (req.method === 'GET') {
    // 获取当前订阅数量
    return res.status(200).json({
      success: true,
      count: subscriberCount,
    });
  }

  if (req.method === 'POST') {
    // 增加订阅数量
    subscriberCount += 1;
    return res.status(200).json({
      success: true,
      count: subscriberCount,
    });
  }

  return res
    .status(405)
    .json({ success: false, count: 0, message: 'Method not allowed' });
}

// 导出获取当前计数器值的函数，避免导出可变绑定
export const getSubscriberCount = () => subscriberCount;
