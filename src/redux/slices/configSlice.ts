import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';

const initialState = {
  hostStaticResource: null,
  deeplink: null,
  listCity: [],
  template: {
    appVersion: {},
    listBanner: [],
    listCard: [],
    listCoverImageProgram: [],
    listFormClaim: [],
    listGroupProgram: [],
    listIconBenefit: [],
    listIconFlexi: [],
    listImageClaim: [],
    listLogo: [],
  },
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setHostStaticResource: (state, action) => {
      state.hostStaticResource = action.payload;
    },
    setDeeplink: (state, action) => {
      state.deeplink = action.payload;
    },
    setListCity: (state, action) => {
      state.listCity = action.payload;
    },
    setTemplate: (state, action) => {
      state.template = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setHostStaticResource, setListCity, setDeeplink, setTemplate} =
  configSlice.actions;

export const selectHostStaticResource = (state: RootState) =>
  state.config.hostStaticResource;
export const selectDeeplink = (state: RootState) => state.config.deeplink;
export const selectListCity = (state: RootState) => state.config.listCity;
export const selectListGroupProgram = (state: RootState) =>
  state.config.template.listGroupProgram;
export const selectListLogo = (state: RootState) =>
  state.config.template.listLogo;

const configReducer = configSlice.reducer;

export default configReducer;
