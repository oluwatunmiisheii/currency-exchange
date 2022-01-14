import React from 'react'
import { IInput } from '../../../models/Input.model';
import styles from './Input.module.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';

const Input: React.FC<IInput> = (props) => {
  return (
    <>
      {props.hasLabel && (
        <label htmlFor={props.inputId} className={styles["revolute-input__label"]}>
          {props.label}
        </label>
      )}
      <div className="mt-1 border-b border-gray-300 focus-within:border-indigo-600 relative">
        <input
          type={props.type}
          name={props.name}
          id={props.inputId}
          disabled={props.disabled}
          className={styles["revolute-input"]}
          placeholder={props.placeholder}
          required={props.required}
          onChange={props.onAmountChange}
          pattern={props.pattern}
          value={props.value}
          data-testid='test-input'
        />
        {props.hasError && (
          <div className='absolute'>
            <ErrorMessage message={props.errorMessage} />
          </div>
        )}
      </div>
    </>
  );
}

Input.defaultProps = {
  required: false,
  hasError: false,
  hasLabel: false,
}

export default Input;