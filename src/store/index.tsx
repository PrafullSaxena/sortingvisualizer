import { configureStore } from '@reduxjs/toolkit';
import { lineReducer } from './slice/lineSlice';

export const store = configureStore({
  reducer: {
    line: lineReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
