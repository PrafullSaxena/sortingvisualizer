import { configureStore } from '@reduxjs/toolkit';
import { elementReducer } from './slice/elementSlice';
import { settingsReducer } from './slice/settingsSlice';
import { applicationStateReducer } from './slice/stateSlice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    elements: elementReducer,
    applicationstate: applicationStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
