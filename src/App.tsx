import React from 'react';
import styles from './App.module.scss';
import CurrencyExchange from './containers/currencyExchange/CurrencyExchange';
// import CurrencyExchangeService from './services/CurrencyExchange.service';


interface AppProps {
  
}
 
const App: React.FC<AppProps> = () => {
  // const processGetLatestRates = async () => {
  //   const response = await CurrencyExchangeService.getLatestRates();
  //   console.log(response);
  // }

  // React.useEffect(() => {
  //   processGetLatestRates();
  // })

  return (  
    <main className={styles["main-wrapper"]}>
      <CurrencyExchange />
    </main>
  )
}
 
export default App;
