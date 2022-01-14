import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Panel, { IPanelProps } from '../Panel';

const onAmountChange = jest.fn();

const panelProps: IPanelProps = {
  inputId: 'test-input',
  label: 'test-label',
  name: 'test-name',
  type: 'text',
  placeholder: 'test-placeholder',
  value: 'test-value',
  onAmountChange: () => {},
  hasError: false,
  errorMessage: '',
  children: <div>test-children</div>,
  currency: 'EUR',
  balance: 0.00,
  popoverContent: <div>test-popover-content</div>,
};

const setup = (props: IPanelProps) => render(<Panel {...props} />);
 

describe('Panel', () => {
  it('should render custom popover component when trigger button is clicked', async () => {
    setup({...panelProps});
    
    const togglePopOverButton = screen.getByTestId('toggle-popover');
    fireEvent.click(togglePopOverButton);

    const popOverContent = screen.getByText(/^test-popover-content$/i); // full string match, ignore case
  
    expect(popOverContent).toBeInTheDocument();
    expect(popOverContent).toHaveTextContent('test-popover-content');

  });

  it('Should update input field when onAmountChange prop is Called', async () => {
    const { container } = setup({
      ...panelProps,
      onAmountChange,
      hasError: false,
      errorMessage: '',
    });
  
    const input = screen.getByTestId('test-input');
    fireEvent.change(input, { target: { value: '0.00' } });
  
    expect(onAmountChange).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  })

})
