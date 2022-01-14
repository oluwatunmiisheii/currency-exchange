import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CurrencyList from '../CurrencyList';
 
const onCurrencyChange = jest.fn();

const setup = () => render(<CurrencyList onCurrencyChange={onCurrencyChange} />);

describe('CurrencyList', () => {
  it('should render currencies', async () => {
    setup();
  
    const currencies = ['USD', 'EUR', 'GBP'];
  
    currencies.forEach(currency => {
      const currencyOption = screen.getByText(currency);
      expect(currencyOption).toBeInTheDocument();
    })
  });
  
  it('should trigger onCurrencyChange props', async () => {
    setup();
  
    const trigger = screen.getAllByTestId('select-currency');
    trigger.forEach(element => {
      fireEvent.click(element);
    })
  
    expect (onCurrencyChange).toHaveBeenCalled();
  });
  
  it('should call onCurrencyChange props with the right parameter', async () => {
    setup();
  
    const trigger = screen.getAllByTestId('select-currency');
    trigger.forEach(element => {
      fireEvent.click(element);
    })
  
    expect (onCurrencyChange).toHaveBeenCalledWith('EUR');
  });

})

