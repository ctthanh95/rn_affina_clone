import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

const initialState = {
  isConnected: true,
};

export const connetSlice = createSlice({
  name: 'connect',
  initialState,
  reducers: {
    changeConnectSlice: state => {
      state.isConnected = !state.isConnected;
    },
  },
});

// Action creators are generated for each case reducer function
export const {changeConnectSlice} = connetSlice.actions;

export const selectIsConnected = (state: RootState) =>
  state.connect.isConnected;

const connetReducer = connetSlice.reducer;

export default connetReducer;
