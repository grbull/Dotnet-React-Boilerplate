import React from 'react';
import { Link } from 'react-router-dom';
import { RouteConstants } from '../../utilities/RouteConstants';

export const Navigation = () => {
  return (
    <div>
      <h1>Dotnet React Boilerplate</h1>
      <Link to={RouteConstants.HOME}>Home</Link>
      <Link to={RouteConstants.REGISTER}>Register</Link>
    </div>
  );
};
