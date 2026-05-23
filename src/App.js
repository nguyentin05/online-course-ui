import { Suspense, useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UserContext, EnrollContext } from './configs/MyContexts';
import MyUserReducer from './reducers/MyUserReducer';
import MyEnrollReducer, { initialEnroll } from './reducers/MyEnrollReducer';
import cookies from 'react-cookies';
import AppRoutes from './routes';
import MySpinner from './components/layout/MySpinner';

const App = () => {
  const [user, userDispatch] = useReducer(MyUserReducer, cookies.load('user') || null);
  const [enroll, enrollDispatch] = useReducer(MyEnrollReducer, initialEnroll);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      <EnrollContext.Provider value={[enroll, enrollDispatch]}>
        <BrowserRouter>
          <Suspense fallback={<MySpinner />}>
            <AppRoutes />
          </Suspense>
        </BrowserRouter>
      </EnrollContext.Provider>
    </UserContext.Provider>
  );
}

export default App;