import React, { useState } from 'react'
import { ArrowDownIcon, RefreshIcon } from '@heroicons/react/outline'
import Panel from '../../components/panel/Panel';
import CurrencyList from '../../components/currencyList/CurrencyList';

interface ICurrencyConverter {

}

interface IErrors {
  currencyToConvertTo: {
    hasError?: boolean,
    message?: string,
  } | null,
  currencyToConvertFrom: {
    hasError?: boolean,
    message?: string,
  } | null,
}

interface IAmount {
  'currencyToConvertFrom': number | string,
  'currencyToConvertTo': number | string,
}

const CurrencyConverter: React.FC<ICurrencyConverter> = () => {
  const [errors, setErrors] = useState<IErrors>({
    currencyToConvertTo: null,
    currencyToConvertFrom: null,
  });

  const [amount, setAmount] = useState<IAmount>({
    'currencyToConvertFrom': '1000.00',
    'currencyToConvertTo': '0.00',
  })

  const validateFieldAnSetValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const validated = value.match(/^(\d*\.{0,1}\d{0,2}$)/)

    if (validated) {
      setAmount({ ...amount, [name]: value })
    }

  }

  console.log(amount)

  return (
    <>
      <h1 className="sr-only">Revolute Currency Conversion</h1>

      <div className="bg-white shadow sm:rounded-md grid grid-cols-1 w-full relative">
        {/* currency to convert */}
        <div className="p-12 rounded-l-md relative overflow-hidden">
          <div className="pb-7">
            <h2 className="text-gray-700 text-xl font-bold">Sell USD</h2>
            <span className="text-gray-500 text-sm inline-flex items-center">1USD = 0.89GBP</span>
          </div>

          <Panel
            hasLabel={true}
            label="You Have"
            inputId="currencyToConvertFrom"
            type="text"
            name="currencyToConvertFrom"
            placeholder="0.00"
            onChange={validateFieldAnSetValue}
            value={amount['currencyToConvertFrom']}
            hasError={errors?.['currencyToConvertFrom']?.hasError ?? false}
            errorMessage={errors?.['currencyToConvertFrom']?.message ?? ''}
            popoverContent={<CurrencyList />}
            balance={3000.00}
            symbol="$"
            currency='USD'
          />

        </div>

        {/* currency to convert to */}
        <div className="p-12 rounded-l-md relative overflow-hidden bg-gray-100">
          <Panel
            hasLabel
            label="You Get"
            inputId="currencyToConvertTo"
            type="number"
            name="currencyToConvertTo"
            placeholder="0.00"
            value={amount['currencyToConvertTo']}
            onChange={validateFieldAnSetValue}
            hasError={errors?.['currencyToConvertTo']?.hasError ?? false}
            errorMessage={errors?.['currencyToConvertTo']?.message ?? ''}
            popoverContent={<CurrencyList />}
            balance={3000.00}
            symbol="$"
            currency='USD'
          >
            <div className="mt-8 flex items-center">
              <span className="mr-1">
                <RefreshIcon className='w-4 h-4' />
              </span>
              <span>
                Rates will be refreshed in 30 seconds
              </span>
            </div>
          </Panel>
        </div>

        {/* switch button */}
        <button className="bg-gray-900 h-10 w-10 rounded-full absolute flex items-center justify-center top-[51%] right-[50%]">
          <ArrowDownIcon className="h-6 w-6 text-white" />
          <span className="sr-only">Switch Currencies</span>
        </button>
      </div>
    </>
  );
}

export default CurrencyConverter;