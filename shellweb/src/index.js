import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

import { MsalProvider } from "@azure/msal-react";
import msalInstance from './authConfig';

//const domain = 'https://login.microsoftonline.com/';
//const clientId = "e335e30e-90dd-4c46-adb6-34769d2d4cf9";
//gmail-DOPfXLzHuv28CODgRRsGZm6KaUEbsAev
//API KEY- AIzaSyAJugM3Bla-lThwtiI-JHzCQbHVIWICSa8 //https://aistudio.google.com/apikey
//API CHAT KEY - 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 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
  <Auth0Provider
    domain="dev-w4qaxbfvnuojhb7r.us.auth0.com"
    clientId="KHn0NBySldyNg6hUV5VaOpDBY2qGegAL"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
     <MsalProvider instance={msalInstance}>
    <App />
    </MsalProvider>
  </Auth0Provider>,
 // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
