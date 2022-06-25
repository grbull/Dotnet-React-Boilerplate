import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { useAuthorization } from './hooks/useAuthorization';
import { HomePage } from './pages/Home/Home';
import { LoginPage } from './pages/Login/Login';
import { RegisterPage } from './pages/Register/Register';
import { RouteConstants } from './utilities/RouteConstants';

export const App = () => {
  const [userManager] = useAuthorization();

  const getUser = async () => {
    await userManager?.signinSilent({ useReplaceToNavigate: true });
    const user = await userManager?.getUser();
    console.log(user);
  };

  return (
    <BrowserRouter>
      <Layout>
        <button onClick={getUser} type="button">
          User
        </button>
        <Routes>
          <Route element={<HomePage />} path={RouteConstants.HOME} />
          <Route element={<RegisterPage />} path={RouteConstants.REGISTER} />
          <Route element={<LoginPage />} path={RouteConstants.LOGIN} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
