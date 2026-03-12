import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import dataSlice from './dataSlice';
import mlSlice from './mlSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    data: dataSlice,
    ml: mlSlice,
  },
});

export default store;