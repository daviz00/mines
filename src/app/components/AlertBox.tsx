'use client';

import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { X } from 'lucide-react';

interface AlertBoxProps {
  alertTitle: string;
  alertDescription: string;
  closeAlertBox: () => void;
}

function AlertBox({
  alertTitle,
  alertDescription,
  closeAlertBox,
}: AlertBoxProps) {
  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='relative w-[90%] max-w-md bg-[#0F212E] rounded-xl border border-[#557086] shadow-2xl overflow-hidden'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b border-[#557086]'>
          <AlertTitle className='text-lg font-bold text-white'>
            {alertTitle}
          </AlertTitle>
          <button
            onClick={closeAlertBox}
            className='p-1 hover:bg-[#1A2C38] rounded-full transition-colors'>
            <X className='h-5 w-5 text-[#a4bcd3]' />
          </button>
        </div>

        {/* Content */}
        <div className='p-6'>
          <AlertDescription className='text-[#a4bcd3] text-sm'>
            {alertDescription}
          </AlertDescription>
        </div>

        {/* Footer */}
        <div className='p-4 border-t border-[#557086] flex justify-end'>
          <button
            onClick={closeAlertBox}
            className='px-6 py-2 bg-[#00E701] hover:bg-[#1FFF20] text-black font-bold rounded-md transition-colors'>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertBox;
