import { createSlice } from '@reduxjs/toolkit';
import { LineType } from '../../utils/Types';

const inititalState: LineType[] = [];

export const lineSlice = createSlice({
  name: 'line',
  initialState: inititalState,
  reducers: {
    addLine: (state, action) => {
      state.push(action.payload);
    },
    removeLine: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },
  },
});

export const { addLine, removeLine } = lineSlice.actions;
export const lineReducer = lineSlice.reducer;
