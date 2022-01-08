import React from 'react'
import { ArrowDownIcon, RefreshIcon } from '@heroicons/react/outline'
import Panel from '../../components/conversion/Panel';


interface ICurrencyConverter {

}

const CurrencyConverter: React.FC<ICurrencyConverter> = () => {
  return (
    <>
      <h1 className="sr-only">Revolute Currency Conversion</h1>

      <div className="bg-white shadow overflow-hidden sm:rounded-md grid grid-cols-1 w-full relative">
        {/* currency to convert */}
        <div className="p-12 rounded-l-md relative overflow-hidden">
          <div className="pb-7">
            <h2 className="text-gray-900 text-xl font-bold">Sell USD</h2>
            <span className="text-gray-500 text-sm inline-flex items-center">1USD = 0.89GBP</span>
          </div>

          <Panel
            hasLabel={true}
            label="You Have"
            inputId="currency-to-convert"
            type="text"
            name="currency-to-convert"

            placeholder="0.00"
          />

        </div>

        {/* currency to convert to */}
        <div className="p-12 rounded-l-md relative overflow-hidden bg-gray-100">
          <Panel
            hasLabel
            label="You Get"
            inputId="currency-to-convert"
            type="text"
            name="currency-to-convert"
            placeholder="0.00"
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