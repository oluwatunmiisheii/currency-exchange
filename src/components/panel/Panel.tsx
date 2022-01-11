import React from 'react';
import Input from '../common/input/Input';
import { IInput } from '../../models/Input.model';
import CustomPopover from '../common/popover/CustomPopover';

interface PanelProps extends IInput {
  children?: React.ReactNode;
  popoverContent: React.ReactElement,
  currency: string,
  balance: number,
  symbol: string,
}

const Panel: React.FC<PanelProps> = (props) => {
  return (
    <div>
      <div className="flex items-end">
        <div className="w-3/5">
          <Input
            hasLabel={props.hasLabel}
            label={props.label}
            inputId={props.inputId}
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            disabled={props.disabled}
            onChange={props.onChange}
            value={props.value}
          />
        </div>
        <div className="w-2/5 ml-6">
          <CustomPopover currency={props.currency} balance={props.balance} symbol={props.symbol}>
            {props.popoverContent}
          </CustomPopover>
        </div>
      </div>
      <>
        <h6 className="text-gray-500 text-sm inline-flex items-center">
          {props.children}
        </h6>
      </>
    </div>
  );
}

export default Panel;
