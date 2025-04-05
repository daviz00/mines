'use client';

import React, { useEffect, useState } from 'react';

interface WinningProps {
  winningMultiplier: number;
  winningAmount: number;
  isBombClicked: boolean;
  onClose: () => void;
}

function Winning({
  winningMultiplier,
  winningAmount,
  isBombClicked,
  onClose,
}: WinningProps) {
  const [progress, setProgress] = useState(100);
  const isWin = !isBombClicked && winningAmount > 0;
  const borderColor = isWin ? 'border-[#00E701]' : 'border-[#FF4444]';
  const textColor = isWin ? 'text-[#00E701]' : 'text-[#FF4444]';

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 100 / 30; // Decrease by 1/30th every 100ms for 3 seconds
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress <= 0) {
      onClose();
    }
  }, [progress, onClose]);

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'>
      <div
        className={`relative w-[90%] max-w-md bg-[#0F212E] rounded-xl border-2 ${borderColor} shadow-2xl overflow-hidden`}>
        {/* Progress Bar */}
        <div className='absolute top-0 left-0 h-1 bg-[#557086] w-full'>
          <div
            className='h-full transition-all duration-100 ease-linear'
            style={{
              width: `${progress}%`,
              backgroundColor: isWin ? '#00E701' : '#FF4444',
            }}
          />
        </div>

        {/* Content */}
        <div className='p-6'>
          <div className='space-y-6 text-center'>
            <h2 className='text-lg font-bold text-white'>
              {isWin ? 'You Won!' : 'Game Over'}
            </h2>

            <div className='space-y-2'>
              <p className='text-sm text-[#a4bcd3]'>Multiplier</p>
              <h1 className={`text-4xl font-bold ${textColor}`}>
                {winningMultiplier.toFixed(2)}x
              </h1>
            </div>

            <div className='space-y-2'>
              <p className='text-sm text-[#a4bcd3]'>Amount</p>
              <h1 className={`text-4xl font-bold ${textColor}`}>
                ₹{winningAmount.toFixed(2)}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Winning;
