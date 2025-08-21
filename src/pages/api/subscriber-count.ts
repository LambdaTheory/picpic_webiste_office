import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

interface SubscriberCountResponse {
  success: boolean;
  count: number;
  message?: string;
}

// 数据文件路径
const dataFilePath = path.join(process.cwd(), 'data', 'subscriber-count.json');

// 确保数据目录存在
const ensureDataDir = () => {
  const dataDir = path.dirname(dataFilePath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// 读取订阅数量
const readSubscriberCount = (): number => {
  try {
    ensureDataDir();
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, 'utf8');
      const parsed = JSON.parse(data);
      return parsed.count || 2847;
    }
    return 2847; // 默认值
  } catch (error) {
    console.error('Error reading subscriber count:', error);
    return 2847;
  }
};

// 写入订阅数量
const writeSubscriberCount = (count: number): void => {
  try {
    ensureDataDir();
    const data = { count, lastUpdated: new Date().toISOString() };
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing subscriber count:', error);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubscriberCountResponse>,
) {
  if (req.method === 'GET') {
    // 获取当前订阅数量
    const count = readSubscriberCount();
    return res.status(200).json({
      success: true,
      count,
    });
  }

  if (req.method === 'POST') {
    // 增加订阅数量
    const currentCount = readSubscriberCount();
    const newCount = currentCount + 1;
    writeSubscriberCount(newCount);
    return res.status(200).json({
      success: true,
      count: newCount,
    });
  }

  return res
    .status(405)
    .json({ success: false, count: 0, message: 'Method not allowed' });
}

// 导出获取当前计数器值的函数，避免导出可变绑定
export const getSubscriberCount = () => readSubscriberCount();
