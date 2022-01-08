import React from 'react';
import Example from '../dropdown/Dropdown';
import Input from '../common/input/Input';
import { IInput } from '../../models/Input.model';

interface PanelProps extends IInput {
  children?: React.ReactNode;
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
            />
          </div>
          <div className="w-2/5 ml-6">
            <Example />
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
