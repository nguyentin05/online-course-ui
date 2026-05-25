import { useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { SWRConfig } from 'swr';
import Apis from './configs/Apis';

const globalFetcher = async (url) => {
  const res = await Apis.get(url);
  return res.data; 
};

const App = () => {
  return (
    <SWRConfig value={{ fetcher: globalFetcher, 
      revalidateOnFocus: false,
      shouldRetryOnError: false
    }}
    >
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </SWRConfig>
  );
}

export default App;