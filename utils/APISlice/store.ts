// src/app/store.ts or wherever your Redux store is

import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './userApi';
 

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    // ...your other reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
