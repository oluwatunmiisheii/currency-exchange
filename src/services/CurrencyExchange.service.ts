import { Currencies } from '../enums/Currencies.enum';
import Axios from '../plugins/Axios.plugin';
import axios, { AxiosResponse } from 'axios'

const requiredCurrencies = Object.values(Currencies);

interface ILatestRates {
  base: string;
  timestamp: number;
  rates: [string, number][];
}

class CurrencyExchangeService {
  async getLatestRates(): Promise<ILatestRates> {
    const apiResponse = await Axios.get<AxiosResponse, ILatestRates>('/latest.json', {
      params: {
        app_id: process.env.REACT_APP_OPEN_EXCHANGE_RATES_APP_ID,
        symbols: requiredCurrencies.join(','),
      }
    });

    // return data from the response
    return {
      rates: apiResponse.rates, 
      base: apiResponse.base, 
      timestamp: apiResponse.timestamp
    };
  }
}


export default new CurrencyExchangeService();
