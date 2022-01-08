import React from 'react';
import styles from './App.module.scss';
import CurrencyConverter from './containers/currencyConverter/CurrencyConverter';


interface AppProps {
  
}
 
const App: React.FC<AppProps> = () => {
  return (  
    <main className={styles["main-wrapper"]}>
      <CurrencyConverter />
    </main>
  )
}
 
export default App;
