import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

const initialState = {
  count: 0,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startCallApiSlice: state => {
      state.count += 1;
    },
    finishCallApiSlice: state => {
      state.count -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const {startCallApiSlice, finishCallApiSlice} = loadingSlice.actions;

export const selectIsLoading = (state: RootState) => state.loading.count > 0;
export const selectCount = (state: RootState) => state.loading.count;

const loadingReducer = loadingSlice.reducer;

export default loadingReducer;
