import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './slices/SystemSettingsSlice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
  },
})