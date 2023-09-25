import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

const initialState = {
  isLogin: false,
  isBiometrics: null,
  username: '',
  expireAt: '',
  refreshAt: '',
  userData: null,
  password: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInSlice: (state, action) => {
      state.isLogin = true;
      state.username = action.payload.username;
      state.expireAt = action.payload.expireAt;
      state.refreshAt = action.payload.refreshAt;
    },
    signOutSlice: () => initialState,
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setBiometrics: (state, action) => {
      state.isBiometrics = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  signInSlice,
  signOutSlice,
  setUsername,
  setUserData,
  setBiometrics,
  setPassword,
} = authSlice.actions;

export const selectIsLogin = (state: RootState) => state.auth.isLogin;
export const selectIsBiometrics = (state: RootState) => state.auth.isBiometrics;
export const selectUsername = (state: RootState) => state.auth.username;
export const selectExpireAt = (state: RootState) => state.auth.expireAt;
export const selectRefreshAt = (state: RootState) => state.auth.refreshAt;
export const selectUserData = (state: RootState) => state.auth.userData;
export const selectPassword = (state: RootState) => state.auth.password;

const authReducer = authSlice.reducer;

export default authReducer;
