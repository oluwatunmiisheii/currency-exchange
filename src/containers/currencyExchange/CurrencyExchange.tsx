import React, { useState, useMemo } from 'react'
import { ArrowDownIcon, RefreshIcon, ArrowUpIcon } from '@heroicons/react/outline'
import { useQuery } from 'react-query'
import Panel from '../../components/panel/Panel';
import CurrencyList from '../../components/currencyList/CurrencyList';
import CurrencyExchangeService from '../../services/CurrencyExchange.service';
import useUserBalance from '../../hooks/useUserBalance';
import { ArrowRightIcon } from '@heroicons/react/solid'

interface IErrors {
  [key: string]: { hasError?: boolean, message?: string } | null,
}

const CurrencyConverter: React.FC = () => {
  // Queries
  const { data, isLoading } = useQuery('fetchRates', CurrencyExchangeService.getLatestRates, {
    retry: 3, // Will retry failed requests 3 times before displaying an error
    refetchInterval: 10000, // fetch current rate every 10 seconds
    refetchIntervalInBackground: false, //stop refetching when the user navigates away from the page
    refetchOnWindowFocus: false,
  });

  // State
  const [errors, setErrors] = useState<IErrors>({ currencyToExchangeTo: null, currencyToExchangeFrom: null });
  const [actionType, setActionType] = useState<string>('sell');
  const [currencyOne, setCurrencyOne] = useState<string>(data?.base ?? 'USD')
  const [currencyTwo, setCurrencyTwo] = useState<string>('GBP')
  const [amountOne, setAmountOne] = useState<number | string>('')
  const [amountTwo, setAmountTwo] = useState<number | string>('')

  /**
   * function to check the difference between user's balance and the amount to be exchanged
   *  if the difference is negative, it will return an error message
   *
   * @param {(string | number)} value
   * @param {number} balance
   * @param {string} scope
   */
  const handleError = (value: string | number, balance: number, scope: string) => {
    if (+value > balance) {
      setErrors((err) => ({ ...err, [scope]: { hasError: true, message: 'Exceeds balance' } }))
    } else {
      setErrors((err) => ({ ...err, [scope]: null }))
    }
  }


  // hooks to get user balance for currency one
  const { userBalance: currencyOneBalance } = useUserBalance({
    currency: currencyOne,
    amount: amountOne,
    scope: 'currencyToExchangeFrom',
    cb: handleError
  });

  // hooks to get user balance for currency two
  const { userBalance: currencyTwoBalance } = useUserBalance({
    currency: currencyTwo,
    amount: amountTwo,
    scope: 'currencyToExchangeTo',
    cb: handleError
  });

  /**
   * function to validate that the amount to be exchanged is a number and 
   * has at most two decimal places.
   * 
   * @param {string} value - the value to be validated
   * @return {*} 
   */
  const validateValue = (value: string) => {
    return value.match(/^(\d*\.{0,1}\d{0,2}$)/) ? true : false;
  }

  // functions to handle amount and currency changes
  const handleAmountOneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if(validateValue(value)) {
      setAmountOne(value);

      if(actionType === 'sell') {
        setErrors({ ...errors, 'currencyToExchangeTo': null })
        handleError(value, currencyOneBalance, 'currencyToExchangeFrom')
      }

      const newAmountTwo = data && (+value * data?.rates?.[currencyTwo] / data?.rates?.[currencyOne])?.toFixed(2)
      setAmountTwo(newAmountTwo ?? 0);

      if (actionType === 'buy') {
        handleError(newAmountTwo ?? 0, currencyTwoBalance, 'currencyToExchangeTo');
      }
    }
  }

  const handleCurrencyOneChange = (currency: string) => {
    setCurrencyOne(currency);
    data && setAmountTwo((+amountOne * data?.rates?.[currencyTwo] / data?.rates?.[currency])?.toFixed(2));
  }

  const handleAmountTwoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (validateValue(value)) {
      setAmountTwo(value);

      if (actionType === 'buy') {
        setErrors({ ...errors, 'currencyToExchangeFrom': null })
        handleError(value, currencyTwoBalance, 'currencyToExchangeTo');
      }

      const newAmountOne = data && (+value * data?.rates?.[currencyOne] / data?.rates?.[currencyTwo])?.toFixed(2)
      setAmountOne(newAmountOne ?? 0);

      if (actionType === 'sell') {
        handleError(newAmountOne ?? 0, currencyOneBalance, 'currencyToExchangeFrom');
      }

    }
  }

  const handleCurrencyTwoChange = (currency: string) => {
    setCurrencyTwo(currency);
    data && setAmountTwo((+amountTwo * data?.rates?.[currencyOne] / data?.rates?.[currency])?.toFixed(2));
  }

  /**
   * function to check if the conversion button should be disabled
   *
   * @return {*}  {boolean}
   */
  const handleButtonDisable = (): boolean => {
    let disableButton = false;

    if (+amountOne === 0 || +amountTwo === 0) {
      disableButton = true;
    }

    if (Object.keys(errors).some(key => errors[key]?.hasError)) {
      disableButton = true;
    }

    return disableButton;

  }

  /**
   * function toggle action type between sell and buy and also validate the amount to be exchanged
   *  against the users wallet balance
   *
   */
  const changeActionType = (): void => {
    setErrors((err) => ({ ...err, 'currencyToExchangeFrom': null, 'currencyToExchangeTo': null }))

    const newActionType = actionType === 'sell' ? 'buy' : 'sell';
    setActionType(newActionType)


    if (newActionType === 'buy') {
      handleError(amountTwo, currencyTwoBalance, 'currencyToExchangeTo')
    }

    if (newActionType === 'sell') {
      handleError(amountOne, currencyOneBalance, 'currencyToExchangeFrom');
    }

  }

  /**
   * function to calculate the exchange rate
   *
   * @return {number} rate of the currency to exchange to
   */
  const calculateExchangeRate = (): number => {
    let rate = 0;
    data?.rates && (rate = data?.rates?.[currencyTwo] / data?.rates?.[currencyOne]);
    return +rate?.toFixed(4);
  }

  /** @type {*} 
   * using use memo to avoid re-rendering the component
  */
  const calculateExchangeRateHandler: any = useMemo(calculateExchangeRate, [data, currencyOne, currencyTwo])

  if (isLoading) {
    return <div></div>;
  }

  return (
    <>
      <h1 className="sr-only">Revolute Currency Exchange</h1>

      <div className="bg-white shadow sm:rounded-md grid grid-cols-1 w-full relative">
        {/* currency to convert */}
        <div className="p-12 rounded-l-md relative overflow-hidden">
          <div className="pb-7">
            <h2 
              className="text-gray-700 text-xl font-bold capitalize" 
              data-testid="action-type"
            >
              {actionType} {currencyOne}
            </h2>
            <span className="text-gray-500 text-sm inline-flex items-center">
              1{currencyOne} = {calculateExchangeRateHandler} {currencyTwo}
            </span>
          </div>

          {/* currency to convert from */}
          <Panel
            hasLabel={true}
            label="You Have"
            inputId="currencyToConvertFrom"
            type="text"
            name="currencyToExchangeFrom"
            placeholder="0.00"
            onAmountChange={handleAmountOneChange}
            value={amountOne}
            hasError={errors?.['currencyToExchangeFrom']?.hasError ?? false}
            errorMessage={errors?.['currencyToExchangeFrom']?.message ?? ''}
            popoverContent={
              <CurrencyList
                rates={data?.rates}
                onCurrencyChange={(currency) => handleCurrencyOneChange(currency)}
              />
            }
            balance={currencyOneBalance}
            currency={currencyOne}
          />
        </div>

        {/* currency to convert to */}
        <div className="p-12 rounded-l-md relative overflow-hidden bg-gray-100">
          <Panel
            hasLabel
            label="You Get"
            inputId="currencyToExchangeTo"
            type="text"
            name="currencyToExchangeTo"
            placeholder="0.00"
            value={amountTwo}
            onAmountChange={handleAmountTwoChange}
            hasError={errors?.['currencyToExchangeTo']?.hasError ?? false}
            errorMessage={errors?.['currencyToExchangeTo']?.message ?? ''}
            popoverContent={
              <CurrencyList
                rates={data?.rates}
                onCurrencyChange={(currency) => {
                  handleCurrencyTwoChange(currency);
                }}
              />
            }
            balance={currencyTwoBalance}
            currency={currencyTwo}
          >
            <div className="mt-8 items-center text-gray-500 text-sm hidden">
              <span className="mr-1">
                <RefreshIcon className='w-4 h-4' />
              </span>
              <span>
                Rates will be refreshed in 30 seconds
              </span>
            </div>
            <div className="mt-12 flex items-center justify-center w-full">
              <button
                type="button"
                disabled={handleButtonDisable()}
                className="revolute-btn"
                data-testid="exchange-btn"
              >
                {actionType === 'sell' ? (
                  <span>Sell {currencyOne} for {currencyTwo}</span>
                ) : (
                  <span>Buy {currencyOne} with {currencyTwo}</span>
                )}
                <ArrowRightIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </Panel>
        </div>

        {/* switch button */}
        <button
          onClick={changeActionType}
          data-testid="switch-button"
          className="bg-gray-900 h-10 w-10 rounded-full absolute flex items-center justify-center top-[46%] right-[50%]"
        >
          {actionType === 'sell' ? (
            <ArrowDownIcon className="h-6 w-6 text-white" />
          ) : (
            <ArrowUpIcon className="h-6 w-6 text-white" />
          )}
          <span className="sr-only">Switch Currencies</span>
        </button>
      </div>
    </>
  );
}

export default CurrencyConverter;