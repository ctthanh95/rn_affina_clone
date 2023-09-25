import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

const initialState = {
  program: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProgram: (state, action) => {
      state.program = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setProgram} = productSlice.actions;

export const selectProgram = (state: RootState) => state.product.program;

const productReducer = productSlice.reducer;

export default productReducer;
