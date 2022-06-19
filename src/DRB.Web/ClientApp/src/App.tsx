import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/Home/Home';
import { LoginPage } from './pages/Login/Login';
import { RegisterPage } from './pages/Register/Register';
import { RouteConstants } from './utilities/RouteConstants';

export const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route element={<HomePage />} path={RouteConstants.HOME} />
          <Route element={<RegisterPage />} path={RouteConstants.REGISTER} />
          <Route element={<LoginPage />} path={RouteConstants.LOGIN} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
