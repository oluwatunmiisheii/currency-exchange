import React from 'react';
import styles from './App.module.scss';
import CurrencyExchange from './containers/currencyExchange/CurrencyExchange';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
interface AppProps {

}

// Create a client
const queryClient = new QueryClient()

const App: React.FC<AppProps> = () => {
   return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <main className={styles["main-wrapper"]}>
        <CurrencyExchange />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App;
