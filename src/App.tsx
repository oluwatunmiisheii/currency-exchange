import React from 'react';
import styles from './App.module.scss';
import CurrencyExchange from './containers/currencyExchange/CurrencyExchange';


interface AppProps {
  
}
 
const App: React.FC<AppProps> = () => {
  return (  
    <main className={styles["main-wrapper"]}>
      <CurrencyExchange />
    </main>
  )
}
 
export default App;
