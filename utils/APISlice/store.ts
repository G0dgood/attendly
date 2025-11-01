// src/app/store.ts or wherever your Redux store is

import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './authApi';
import { userApi } from './userApi';
import { attendanceApi } from './attendanceApi';
import { officeApi } from './officeApi';
import authReducer from './authSlice';
import attendanceReducer from './attendanceSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer,
    [officeApi.reducerPath]: officeApi.reducer,
    auth: authReducer,
    attendance: attendanceReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      attendanceApi.middleware,
      officeApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
