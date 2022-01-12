import React, { useState } from 'react';
import { Popover } from 'react-tiny-popover'
import { ChevronDownIcon } from '@heroicons/react/solid';
import { formatCurrency } from '../../../util/FormatCurrency';
interface IProps {
  children: React.ReactElement;
  currency: string;
  balance: number;
}

const CustomPopover: React.FC<IProps> = (props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={['bottom', 'top', 'left', 'right']} // preferred positions by priority
      onClickOutside={() => setIsPopoverOpen(false)}
      content={props.children}
    >
      <button 
        className='inline-flex justify-between w-full border-0 text-left border-b border-gray-300 px-4 py-2 text-sm text-gray-700 focus:outline-none' 
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
      > 
        <div>
          <div className="font-bold text-lg">
            {props.currency}
          </div>
          <div className="text-gray-500">  
            Balance: {formatCurrency(props.balance, props.currency)}  
          </div>
        </div>
        <ChevronDownIcon className="h-5 w-5 text-gray-500" />
      </button>
    </Popover>
  );
};

export default CustomPopover;