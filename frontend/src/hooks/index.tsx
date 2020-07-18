import React from 'react';

import { AuthProvider } from './auth';
import { RequestProvider } from './request';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <RequestProvider>{children}</RequestProvider>
    </AuthProvider>
  );
};

export default AppProvider;
