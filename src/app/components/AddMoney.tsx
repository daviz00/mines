'use client';

import React, { ChangeEvent } from 'react';
import { X } from 'lucide-react';

interface AddMoneyProps {
  addAmount: string;
  addAmountOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  addButton: () => void;
}

function AddMoney({ addAmount, addAmountOnChange, addButton }: AddMoneyProps) {
  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='relative w-[90%] max-w-md bg-[#0F212E] rounded-xl border border-[#557086] shadow-2xl overflow-hidden'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b border-[#557086]'>
          <h2 className='text-lg font-bold text-white'>Add Balance</h2>
          <button
            onClick={addButton}
            className='p-1 hover:bg-[#1A2C38] rounded-full transition-colors'>
            <X className='h-5 w-5 text-[#a4bcd3]' />
          </button>
        </div>

        {/* Content */}
        <div className='p-6'>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-[#a4bcd3]'>
                Amount
              </label>
              <div className='relative'>
                <input
                  type='number'
                  value={addAmount}
                  onChange={addAmountOnChange}
                  className='w-full h-12 px-4 bg-[#1A2C38] border border-[#557086] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00E701] focus:border-transparent'
                  placeholder='Enter amount'
                  min='0'
                  step='0.01'
                />
                <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                  <span className='text-[#a4bcd3]'>$</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='p-4 border-t border-[#557086] flex justify-end gap-3'>
          <button
            onClick={addButton}
            className='px-6 py-2 bg-[#1A2C38] hover:bg-[#2A3C48] text-[#a4bcd3] font-bold rounded-md transition-colors'>
            Cancel
          </button>
          <button
            onClick={addButton}
            className='px-6 py-2 bg-[#00E701] hover:bg-[#1FFF20] text-black font-bold rounded-md transition-colors'>
            Add Balance
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMoney;
