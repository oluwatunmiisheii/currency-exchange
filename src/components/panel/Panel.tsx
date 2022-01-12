import React from 'react';
import Input from '../common/input/Input';
import { IInput } from '../../models/Input.model';
import CustomPopover from '../common/popover/CustomPopover';

interface PanelProps extends IInput {
  children?: React.ReactNode;
  popoverContent: React.ReactElement,
  currency: string,
  balance: number,
  errorMessage?: string,
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
            onAmountChange={props.onAmountChange}
            value={props.value}
            errorMessage={props.errorMessage}
            hasError={props.hasError}
          />
        </div>
        <div className="w-2/5 ml-6">
          <CustomPopover currency={props.currency} balance={props.balance}>
            {props.popoverContent}
          </CustomPopover>
        </div>
      </div>
      <>
        {props.children}
      </>
    </div>
  );
}

export default Panel;
