import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CustomPopover, { IProps } from '../CustomPopover';

const customPopoverProps: IProps = {
  children: <div>test-children</div>,
  currency: 'EUR',
  balance: 0.00,
};

const setup = (props: IProps) => render(<CustomPopover {...props} />);
 

describe('CustomPopover', () => {
  it('should render custom popover content when trigger button is clicked', async () => {
    setup({...customPopoverProps});
    
    const togglePopOverButton = screen.getByTestId('toggle-popover');
    fireEvent.click(togglePopOverButton);

    const popOverContent = screen.getByText(/^test-children$/i); // full string match, ignore case
  
    expect(popOverContent).toBeInTheDocument();
    expect(popOverContent).toHaveTextContent('test-children');

  });

  it('should not render custom popover content when trigger button is not clicked', async () => {
    setup({...customPopoverProps});

    const popOverContent = screen.queryByText(/^test-children$/i); // full string match, ignore case
  
    expect(popOverContent).toBeNull();
    expect(popOverContent).not.toBeInTheDocument()
  });
})
