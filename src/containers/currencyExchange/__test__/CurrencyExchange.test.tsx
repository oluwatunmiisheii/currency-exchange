import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import CurrencyConverter from '../CurrencyExchange';


const queryClient = new QueryClient();



const setup = () => render(
  <QueryClientProvider client={queryClient}>
    <CurrencyConverter />
  </QueryClientProvider>
);
 

describe('CurrencyConverter', () => {
  it('should not update input fields if user inputs alphabets', async () => {
    setup();
    
    const currencyToExchangeFrom = await screen.findByLabelText(/you have/i);
    const currencyToExchangeTo = await screen.findByLabelText(/You Get/i);

    fireEvent.change(currencyToExchangeFrom, { target: { value: 'some value' } });
    await waitFor (() => { expect(currencyToExchangeFrom).toHaveValue('')});
    
    
    fireEvent.change(currencyToExchangeTo, { target: { value: 'some valuess' } });
    await waitFor (() => { expect(currencyToExchangeTo).toHaveValue('')});

  });

  it('should update input fields if user inputs numbers', async () => {
    setup();
    
    const currencyToExchangeFrom = await screen.findByLabelText(/you have/i);
    const currencyToExchangeTo = await screen.findByLabelText(/You Get/i);

    fireEvent.change(currencyToExchangeFrom, { target: { value: '500' } });
    await waitFor (() => { expect(currencyToExchangeFrom).toHaveValue('500')});
    
    
    fireEvent.change(currencyToExchangeTo, { target: { value: '500' } });
    await waitFor (() => { expect(currencyToExchangeTo).toHaveValue('500')});

  });

  it('Should update action type to sell when user clicks on switch button', async () => {
    setup();
    
    const switchButton = await screen.findByTestId(/switch-button/i);

    await fireEvent.click(switchButton);

    const actionType = await screen.findByTestId(/action-type/i);
    expect(actionType).toHaveTextContent(/buy/i);
  });

  it('should disable exchange button if input value is not valid', async () => {
    setup();
    
    const exchangeButton = await screen.findByTestId(/exchange-btn/i);

    // exchange button should be disabled
    expect(exchangeButton).toBeDisabled();
  });


  it('should switch currencies when a new currency is selected', async () => {
    setup();

    const toggleCurrencyListPopoverBtn = await screen.findAllByTestId(/toggle-popover/i);

    // click on toggle currency list popover button
    await fireEvent.click(toggleCurrencyListPopoverBtn[0]);
    
    const currencySelect  = await screen.findAllByTestId(/select-currency/i);
    await fireEvent.click(currencySelect[0]);

    await fireEvent.click(toggleCurrencyListPopoverBtn[1]);
    
    await fireEvent.click(toggleCurrencyListPopoverBtn[1]);
    await fireEvent.click(currencySelect[1]);
  });
})
