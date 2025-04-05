'use client';

import React from 'react';

interface GameControlsProps {
  betAmount: string;
  setBetAmount: (value: string) => void;
  bomb: string;
  setBomb: (value: string) => void;
  activeBet: boolean;
  onBet: () => void;
  onCashout: () => void;
  onReshuffle: () => void;
}

export default function GameControls({
  betAmount,
  setBetAmount,
  bomb,
  setBomb,
  activeBet,
  onBet,
  onCashout,
  onReshuffle,
}: GameControlsProps) {
  return (
    <div className='w-full max-w-md bg-[#213743] rounded-xl p-6 space-y-6 shadow-lg'>
      {/* Bet Amount Input */}
      <div className='space-y-2'>
        <label className='block text-sm font-medium text-[#a4bcd3]'>
          Bet Amount
        </label>
        <div className='relative'>
          <input
            type='number'
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            disabled={activeBet}
            className='w-full h-12 px-4 bg-[#0F212E] border-2 border-[#557086] rounded-lg text-white font-medium focus:outline-none focus:border-[#00E701] disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            placeholder='Enter bet amount'
            min='0'
            step='0.01'
          />
          <span className='absolute right-4 top-1/2 -translate-y-1/2 text-[#a4bcd3] font-medium'>
            ₹
          </span>
        </div>
      </div>

      {/* Number of Mines Select */}
      <div className='space-y-2'>
        <label className='block text-sm font-medium text-[#a4bcd3]'>
          Number of Mines
        </label>
        <select
          value={bomb}
          onChange={(e) => setBomb(e.target.value)}
          disabled={activeBet}
          className='w-full h-12 px-4 bg-[#0F212E] border-2 border-[#557086] rounded-lg text-white font-medium focus:outline-none focus:border-[#00E701] disabled:opacity-50 disabled:cursor-not-allowed transition-colors appearance-none'>
          {Array.from({ length: 24 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num.toString()} className='bg-[#0F212E]'>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className='space-y-4'>
        {activeBet ? (
          <button
            onClick={onCashout}
            className='w-full h-12 bg-[#1475E1] hover:bg-[#2885ef] text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-500/20'>
            CASHOUT
          </button>
        ) : (
          <button
            onClick={onBet}
            disabled={activeBet}
            className='w-full h-12 bg-[#00E701] hover:bg-[#1FFF20] text-black font-bold rounded-lg transition-colors shadow-lg shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed'>
            BET
          </button>
        )}

        <button
          onClick={onReshuffle}
          disabled={!activeBet}
          className='w-full h-12 bg-[#0F212E] hover:bg-[#1A2C38] text-[#a4bcd3] font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
          Re-Shuffle Board
        </button>
      </div>
    </div>
  );
}
