import React from 'react'

const currencies = [
  { "EUR": "Euro" },
  { "GBP": "British Pound Sterling" },
  { "USD": "United States Dollar" },
]

interface IProps {
  rates?: { [key: string]: number },
  onCurrencyChange: (currency: any) => void,
}

const CurrencyList: React.FC<IProps> = (props) => {
  return (
    <div className="bg-white border border-gray-300 overflow-hidden rounded-md">
      <ul className="divide-y divide-gray-300">
        {currencies.map((item, index) => (
          <li 
            key={index} 
            className="cursor-pointer"
            data-testid="select-currency"
            onClick={(e) => {
              props.onCurrencyChange(Object.keys(item)[0]);
            }}
          >
            <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50">
              <div className="flex-1 min-w-0">
                <div className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">{Object.keys(item)}</p>
                  <p className="text-sm text-gray-400">{Object.values(item)}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CurrencyList;