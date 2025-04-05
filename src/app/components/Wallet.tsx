'use client';

import React from 'react';
import { Wallet as WalletIcon, Plus } from 'lucide-react';

interface WalletDisplayProps {
  amount: number;
  onAddMoney: () => void;
}

function WalletDisplay({ amount, onAddMoney }: WalletDisplayProps) {
  return (
    <div className='flex items-center gap-4 bg-[#0F212E] border border-[#557086] rounded-lg p-3 shadow-lg'>
      {/* Wallet Icon and Label */}
      <div className='flex items-center gap-2'>
        <WalletIcon className='h-5 w-5 text-[#a4bcd3]' />
        <span className='text-[#a4bcd3] font-medium'>Balance</span>
      </div>

      {/* Amount Display */}
      <div className='flex-1 text-right'>
        <span className='text-white font-bold text-lg'>
          {amount.toFixed(2)}
        </span>
      </div>

      {/* Add Money Button */}
      <button
        onClick={onAddMoney}
        className='p-2 bg-[#00E701] hover:bg-[#1FFF20] text-black rounded-md transition-colors flex items-center gap-1'>
        <Plus className='h-4 w-4' />
        <span className='font-bold text-sm'>Add</span>
      </button>
    </div>
  );
}

export default WalletDisplay;
