import React from 'react'

const currencies = [
  { "EUR": "Euro" },
  { "GBP": "British Pound Sterling" },
  { "USD": "United States Dollar" },
]

interface IProps {

}

const CurrencyList: React.FC<IProps> = () => {
  return (
    <div className="bg-white border border-gray-300 overflow-hidden rounded-md">
      <ul className="divide-y divide-gray-300">
        {currencies.map((item, index) => (
          <li key={index}>
            <a 
              href='#' 
              className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset"
            >
              <div className="flex-shrink-0">
                {/* <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" /> */}
              </div>
              <div className="flex-1 min-w-0">
                <div className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">{Object.keys(item)}</p>
                  <p className="text-sm text-gray-400">{Object.values(item)}</p>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CurrencyList;