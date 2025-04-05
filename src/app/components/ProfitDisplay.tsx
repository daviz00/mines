'use client';

import React from 'react';

interface ProfitDisplayProps {
  profit: number;
  betAmount: string;
  activeBet: boolean;
}

function ProfitDisplay({ profit, betAmount, activeBet }: ProfitDisplayProps) {
  if (!activeBet) return null;

  const potentialWinnings = (profit * Number(betAmount)).toFixed(2);

  return (
    <div className='fixed top-24 right-4 w-[90%] max-w-md bg-[#0F212E] border border-[#557086] rounded-lg p-4 shadow-lg'>
      <div className='space-y-3'>
        <div className='flex items-center justify-between'>
          <span className='text-[#a4bcd3] font-medium'>Current Multiplier</span>
          <span className='text-[#00E701] font-bold text-xl'>
            {profit.toFixed(2)}x
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-[#a4bcd3] font-medium'>Potential Winnings</span>
          <span className='text-[#00E701] font-bold text-xl'>
            ₹{potentialWinnings}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProfitDisplay;
