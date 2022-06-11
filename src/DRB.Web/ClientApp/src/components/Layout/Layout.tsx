import React, { ReactNode } from 'react';
import { Navigation } from '../Navigation/Navigation';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};
