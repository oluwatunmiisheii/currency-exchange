import { Currencies } from '../enums/Currencies.enum';
import Axios from '../plugins/Axios.plugin';

const requiredCurrencies = Object.values(Currencies);

class CurrencyExchangeService {
  async getLatestRates() {
    const response = await Axios.get('/latest.json', {
      params: {
        app_id: process.env.REACT_APP_OPEN_EXCHANGE_RATES_APP_ID,
        symbols: requiredCurrencies.join(','),
      }
    });
    return response.data;
  }
}

export default new CurrencyExchangeService();
