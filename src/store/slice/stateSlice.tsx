import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { APPLICATION_STATE, ApplicationState } from '../../utils/Types';
import { initialApplicationState } from '../../data/InitialConfiguration';

const inititalState: ApplicationState = initialApplicationState;

export const StateSlice = createSlice({
  name: 'applicationstate',
  initialState: inititalState,
  reducers: {
    changeApplicationState: (
      state,
      action: PayloadAction<APPLICATION_STATE>
    ) => {
      state.currentState = action.payload;
    },
    changeSelectedAlgo: (state, action: PayloadAction<string>) => {
      state.selectedAlgo = action.payload;
    },
    resetState: (state) => {
      state.currentPrimary = -1;
      state.currentSecondary = -1;
      state.currentState = APPLICATION_STATE.IDEAL;
    },
    changePrimaryIndex: (state, action: PayloadAction<number>) => {
      state.currentPrimary = action.payload;
    },
    changeSecondaryIndex: (state, action: PayloadAction<number>) => {
      state.currentSecondary = action.payload;
    },
    setModelState: (state, actoin) => {
      state.modelOpen = actoin.payload;
    },
  },
});

export const {
  changeApplicationState,
  changeSelectedAlgo,
  resetState,
  changePrimaryIndex,
  changeSecondaryIndex,
  setModelState,
} = StateSlice.actions;
export const applicationStateReducer = StateSlice.reducer;
