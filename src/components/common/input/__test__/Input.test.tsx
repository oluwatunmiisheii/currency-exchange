import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Input from '../Input';
import { IInput } from '../../../../models/Input.model';

const onAmountChange = jest.fn();

const inputProps: IInput = {
  inputId: 'test-input',
  label: 'test-label',
  name: 'test-name',
  type: 'text',
  placeholder: 'test-placeholder',
  value: 'test-value',
  onAmountChange: () => {},
  hasError: false,
  errorMessage: '',
};

const setup = (props: IInput) => render(<Input {...props} />);
 

describe('Input', () => {
  it('should render error message passed as props', async () => {
    const { container } = setup({...inputProps, hasError: true, errorMessage: 'This is an error message'});
  
    const message = screen.getByText(/^This is an error message$/i); // full string match, ignore case
  
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent('This is an error message');
  
    expect(container).toMatchSnapshot();
  });
  
  it('Should update input field when onAmountChange prop is Called', async () => {
    const { container } = setup({
      ...inputProps,
      onAmountChange,
      hasError: false,
      errorMessage: '',
    });
  
    const input = screen.getByTestId('test-input');
    fireEvent.change(input, { target: { value: 0.00 } });

    expect(onAmountChange).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  })
  
  it('Should not render a label if hasLabel is false', async () => {
    const { container } = setup({
      ...inputProps,
      hasLabel: false,
    });
  
    const label = screen.queryByText(/^test-label$/i); // full string match, ignore case
    expect(label).not.toBeInTheDocument();
  
    expect(container).toMatchSnapshot();
  })

  it('Should render a label if hasLabel is true', async () => {
    const { container } = setup({
      ...inputProps,
      hasLabel: true,
      label: 'test-label',
    });
  
    const label = screen.queryByText(/^test-label$/i); // full string match, ignore case
    expect(label).toBeInTheDocument();
  
    expect(container).toMatchSnapshot();
  })
  
  it('Should be disabled if disabled prop is set to true', async () => {
    setup({ ...inputProps, disabled: true });
  
    const input = screen.getByTestId('test-input');
    expect(input).toBeDisabled();
    
    userEvent.type(input, 'test');
    expect(input).not.toHaveValue('test');
  })

})
