import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialElements } from '../../data/InitialConfiguration';
import { LineType } from '../../utils/Types';

const inititalState = initialElements;

export const elementSlice = createSlice({
  name: 'line',
  initialState: inititalState,
  reducers: {
    updateElements: (state, action: PayloadAction<LineType[]>) => {
      state.lines = action.payload;
    },
  },
});

export const { updateElements } = elementSlice.actions;
export const elementReducer = elementSlice.reducer;
