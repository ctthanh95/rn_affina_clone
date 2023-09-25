import {combineReducers, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import mySaga from '../sagas';
import connetReducer from '@slices/connectSlice';
import loadingReducer from '@slices/loadingSlice';
import {reduxStorage} from '@utils/mmkv';
import authReducer from '@slices/authSlice';
import errorReducer from '@slices/errorSlice';
import configReducer from '@slices/configSlice';
import productReducer from '@slices/productSlice';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const rootReducer = combineReducers({
  loading: loadingReducer,
  connect: connetReducer,
  auth: authReducer,
  error: errorReducer,
  config: configReducer,
  product: productReducer,
});

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  // blacklist: ['loading', 'connect', 'error', 'config', 'product'],
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware),
});

sagaMiddleware.run(mySaga);

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
