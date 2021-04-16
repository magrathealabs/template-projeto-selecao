import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain= {process.env.AUTH0_DOMAIN}
      clientId= {process.env.AUTH0_CLIENT_ID}
      audience= {process.env.AUTH0_AUDIENCE}
      redirectUri={window.location.origin}      
      useRefreshTokens
      cacheLocation="localstorage"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
reportWebVitals();
