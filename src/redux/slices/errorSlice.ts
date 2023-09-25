import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

const initialState = {
  isError: false,
  titleError: '',
  contentError: '',
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showErrorSlice: state => {
      state.isError = true;
    },
    hideErrorSlice: () => initialState,
    updateErrorSlice: (state, action) => {
      state.titleError = action.payload.title;
      state.contentError = action.payload.content;
    },
  },
});

// Action creators are generated for each case reducer function
export const {showErrorSlice, hideErrorSlice, updateErrorSlice} =
  errorSlice.actions;

export const selectIsError = (state: RootState) => state.error.isError;
export const selectTitleError = (state: RootState) => state.error.titleError;
export const selectContentError = (state: RootState) =>
  state.error.contentError;

const errorReducer = errorSlice.reducer;

export default errorReducer;
