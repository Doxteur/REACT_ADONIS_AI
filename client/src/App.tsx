import React from 'react';
import './App.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './app/store';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { AppRoutes } from './router';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
            <AppRoutes />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
