import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/Home/Home';
import { RegisterPage } from './pages/Register/Register';
import { RouteConstants } from './utilities/RouteConstants';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path={RouteConstants.HOME} />
        <Route element={<RegisterPage />} path={RouteConstants.REGISTER} />
      </Routes>
    </BrowserRouter>
  );
};
