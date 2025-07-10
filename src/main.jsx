// src/main.jsx
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext.jsx';
import { Provider } from 'react-redux'; // 👈 Redux Provider
   

import './index.css';
import App from './App.jsx';
import { store } from './app/Store.js';

const CLIENTID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
console.log("Google Client ID:", CLIENTID);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> 
      <GoogleOAuthProvider clientId={CLIENTID}>
        <AuthProvider>
          <BrowserRouter>
           <App/>
          </BrowserRouter>
        </AuthProvider>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
