import { configureStore } from '@reduxjs/toolkit';
import flightsReducer from './flightSlice';
import { Provider } from 'react-redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // uses localStorage
import { PersistGate } from 'redux-persist/integration/react';

// 1️⃣ Config to persist only desired parts of the slice (optional)
const flightsPersistConfig = {
  key: 'flights',
  storage,
//   whitelist: ['airPorts', 'searchResults'], // adjust to your state keys
};

// 2️⃣ Persist the reducer
const persistedFlightsReducer = persistReducer(flightsPersistConfig, flightsReducer);

// 3️⃣ Create store with persisted reducer
export const store = configureStore({
  reducer: {
    flights: persistedFlightsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// 4️⃣ Create persistor
export const persistor = persistStore(store);

// 5️⃣ Wrap with PersistGate
export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
