import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './reducers/AuthReducers';
import { createLogger } from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Liste des reducers à persister
};

const persistedReducer = persistReducer(persistConfig, authReducer);

// Créer le logger
const logger = createLogger({
  collapsed: true, // Collapse les logs par défaut
  duration: true, // Affiche la durée de chaque action
  timestamp: false, // N'affiche pas le timestamp
});

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    // Ajoutez d'autres reducers ici si nécessaire
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(logger), // Ajouter le logger aux middlewares
  devTools: process.env.NODE_ENV !== 'production', // Activer les DevTools seulement en développement
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
