'use client';

import { IconDotsVertical } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { SparklesCore } from '@/components/ui/sparkles';
import { cn } from '@/lib/utils';

const MemoizedSparklesCore = React.memo(SparklesCore);

interface CompareProps {
  firstImage?: string;
  secondImage?: string;
  firstText?: string;
  secondText?: string;
  className?: string;
  firstImageClassName?: string;
  secondImageClassname?: string;
  firstTextClassName?: string;
  secondTextClassName?: string;
  initialSliderPercentage?: number;
  slideMode?: 'hover' | 'drag';
  showHandlebar?: boolean;
  autoplay?: boolean;
  autoplayDuration?: number;
  mode?: 'image' | 'text';
}
export const Compare = ({
  firstImage = '',
  secondImage = '',
  firstText = '',
  secondText = '',
  className,
  firstImageClassName,
  secondImageClassname,
  firstTextClassName,
  secondTextClassName,
  initialSliderPercentage = 50,
  slideMode = 'hover',
  showHandlebar = true,
  autoplay = false,
  autoplayDuration = 5000,
  mode = 'image',
}: CompareProps) => {
  const [sliderXPercent, setSliderXPercent] = useState(initialSliderPercentage);
  const [isDragging, setIsDragging] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = useCallback(() => {
    if (!autoplay) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress =
        (elapsedTime % (autoplayDuration * 2)) / autoplayDuration;
      const percentage = progress <= 1 ? progress * 100 : (2 - progress) * 100;

      setSliderXPercent(percentage);
      if (autoplayRef.current !== null) {
        autoplayRef.current = setTimeout(animate, 16); // ~60fps
      }
    };

    animate();
  }, [autoplay, autoplayDuration]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current !== null) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  function mouseEnterHandler() {
    stopAutoplay();
  }

  function mouseLeaveHandler() {
    if (slideMode === 'hover') {
      setSliderXPercent(initialSliderPercentage);
    }
    if (slideMode === 'drag') {
      setIsDragging(false);
    }
    startAutoplay();
  }

  const handleStart = useCallback(
    (_clientX: number) => {
      if (slideMode === 'drag') {
        setIsDragging(true);
      }
    },
    [slideMode],
  );

  const handleEnd = useCallback(() => {
    if (slideMode === 'drag') {
      setIsDragging(false);
    }
  }, [slideMode]);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;
      if (slideMode === 'hover' || (slideMode === 'drag' && isDragging)) {
        const rect = sliderRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percent = (x / rect.width) * 100;
        requestAnimationFrame(() => {
          setSliderXPercent(Math.max(0, Math.min(100, percent)));
        });
      }
    },
    [slideMode, isDragging],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => handleStart(e.clientX),
    [handleStart],
  );
  const handleMouseUp = useCallback(() => handleEnd(), [handleEnd]);
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => handleMove(e.clientX),
    [handleMove],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!autoplay) {
        // 检查 touches 数组是否存在且有元素
        if (e.touches?.[0]?.clientX) {
          handleStart(e.touches[0].clientX);
        }
      }
    },
    [handleStart, autoplay],
  );

  const handleTouchEnd = useCallback(() => {
    if (!autoplay) {
      handleEnd();
    }
  }, [handleEnd, autoplay]);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!autoplay) {
        // 检查 touches 数组是否存在且有元素再访问 clientX
        if (e.touches?.[0]?.clientX) {
          handleMove(e.touches[0].clientX);
        }
      }
    },
    [handleMove, autoplay],
  );

  return (
    <div
      ref={sliderRef}
      className={cn('w-[400px] h-[400px] overflow-hidden', className)}
      style={{
        position: 'relative',
        cursor: slideMode === 'drag' ? 'grab' : 'col-resize',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={mouseLeaveHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <AnimatePresence initial={false}>
        <motion.div
          className="absolute top-0 z-30 m-auto h-full w-px bg-gradient-to-b from-transparent from-5% via-indigo-500 to-transparent to-95%"
          style={{
            left: `${sliderXPercent}%`,
            top: '0',
            zIndex: 40,
          }}
          transition={{ duration: 0 }}
        >
          <div className="absolute left-0 top-1/2 z-20 h-full w-36 -translate-y-1/2 bg-gradient-to-r from-indigo-400 via-transparent to-transparent opacity-50 [mask-image:radial-gradient(100px_at_left,white,transparent)]" />
          <div className="absolute left-0 top-1/2 z-10 h-1/2 w-10 -translate-y-1/2 bg-gradient-to-r from-cyan-400 via-transparent to-transparent opacity-100 [mask-image:radial-gradient(50px_at_left,white,transparent)]" />
          <div className="absolute -right-10 top-1/2 h-3/4 w-10 -translate-y-1/2 [mask-image:radial-gradient(100px_at_left,white,transparent)]">
            <MemoizedSparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="size-full"
              particleColor="#FFFFFF"
            />
          </div>
          {showHandlebar && (
            <div className="absolute -right-2.5 top-1/2 z-30 flex size-5 -translate-y-1/2 items-center justify-center   rounded-md bg-white shadow-[0px_-1px_0px_0px_#FFFFFF40]">
              <IconDotsVertical className="size-4 text-black" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="pointer-events-none relative z-20 size-full overflow-hidden">
        <AnimatePresence initial={false}>
          {mode === 'image' && firstImage ? (
            <motion.div
              className={cn(
                'absolute inset-0 z-20 rounded-2xl shrink-0 w-full h-full select-none overflow-hidden',
                firstImageClassName,
              )}
              style={{
                clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`,
              }}
              transition={{ duration: 0 }}
            >
              <img
                alt="first image"
                src={firstImage}
                className={cn(
                  'absolute inset-0  z-20 rounded-2xl shrink-0 w-full h-full select-none',
                  firstImageClassName,
                )}
                draggable={false}
              />
            </motion.div>
          ) : null}
          {mode === 'text' && firstText ? (
            <motion.div
              className={cn(
                'absolute inset-0 z-20 rounded-2xl shrink-0 w-full h-full select-none overflow-hidden p-6 flex items-center justify-center bg-white',
                firstTextClassName,
              )}
              style={{
                clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`,
              }}
              transition={{ duration: 0 }}
            >
              <div className="text-center text-lg leading-relaxed text-gray-800">
                {firstText}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {mode === 'image' && secondImage ? (
          <motion.img
            className={cn(
              'absolute top-0 left-0 z-[19]  rounded-2xl w-full h-full select-none',
              secondImageClassname,
            )}
            alt="second image"
            src={secondImage}
            draggable={false}
          />
        ) : null}
        {mode === 'text' && secondText ? (
          <motion.div
            className={cn(
              'absolute top-0 left-0 z-[19] rounded-2xl w-full h-full select-none p-6 flex items-center justify-center bg-gray-100',
              secondTextClassName,
            )}
          >
            <div className="text-center text-lg leading-relaxed text-gray-800">
              {secondText}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
