import React from 'react';
import './App.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './app/store';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { REACT_APP_GOOGLE_CLIENT_ID } from './config';
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable-next-line jsx-a11y/anchor-is-valid */

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID as string}>
          <Router>
            <AppRoutes />
          </Router>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
