import { createSlice } from '@reduxjs/toolkit';
import { Settings } from '../../utils/Types';
import { InitialSettings } from '../../data/InitialConfiguration';

const inititalState: Settings = InitialSettings;

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: inititalState,
  reducers: {
    setArraySize: (state, action) => {
      state.arraySize = action.payload;
    },
    changeSpeed: (state, action) => {
      state.speed = action.payload;
    },
    setMinSpeed: (state, action) => {
      state.minSpeed = action.payload;
    },
    setMaxSpeed: (state, action) => {
      state.maxSpeed = action.payload;
    },
  },
});

export const { setArraySize, changeSpeed, setMinSpeed, setMaxSpeed } =
  settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
