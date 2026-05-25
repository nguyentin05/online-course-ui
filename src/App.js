import { useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { EnrollContext } from './configs/MyContexts';
import MyUserReducer from './reducers/MyUserReducer';
import MyEnrollReducer, { initialEnroll } from './reducers/MyEnrollReducer';
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