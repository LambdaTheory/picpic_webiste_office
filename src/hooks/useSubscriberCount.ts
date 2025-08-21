import { useEffect, useRef, useState } from 'react';

export const useSubscriberCount = () => {
  const [count, setCount] = useState(2847); // 默认值
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchCount = async () => {
    try {
      const response = await fetch('/api/subscriber-count');
      const data = await response.json();
      if (data.success) {
        setCount(data.count);
      }
    } catch (error) {
      console.error('Failed to fetch subscriber count:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const incrementCount = async () => {
    try {
      const response = await fetch('/api/subscriber-count', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.success) {
        setCount(data.count);
      }
    } catch (error) {
      console.error('Failed to increment subscriber count:', error);
    }
  };

  useEffect(() => {
    fetchCount();

    // 设置定时器，每30-60秒随机增加1-3个订阅者
    const startAutoIncrement = () => {
      const scheduleNext = () => {
        const delay = Math.random() * 30000 + 30000; // 30-60秒
        intervalRef.current = setTimeout(() => {
          const increment = Math.floor(Math.random() * 3) + 1; // 1-3个
          setCount((prevCount) => prevCount + increment);
          scheduleNext();
        }, delay);
      };
      scheduleNext();
    };

    startAutoIncrement();

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, []);

  return {
    count,
    isLoading,
    incrementCount,
    refreshCount: fetchCount,
  };
};
