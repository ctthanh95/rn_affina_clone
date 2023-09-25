import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import RootStack from './RootStack';
import {Loading, Internet, Error} from '@components';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {changeConnectSlice, selectIsConnected} from '@slices/connectSlice';
import {selectIsLoading} from '@slices/loadingSlice';
import {selectIsError} from '@slices/errorSlice';
import {selectHostStaticResource, selectListCity} from '@slices/configSlice';
import {getConfig} from '@sagas/config/getConfig';
import {getCity} from '@sagas/config/getCity';
import {toastConfig} from '@utils/toastConfig';

const RootApp = () => {
  const dispatch = useAppDispatch();
  const isConnected = useAppSelector(selectIsConnected);
  const isLoading = useAppSelector(selectIsLoading);
  const isError = useAppSelector(selectIsError);
  const hostStaticResource = useAppSelector(selectHostStaticResource);
  const listCity = useAppSelector(selectListCity);
  const lengthListCity = listCity.length;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected !== isConnected) {
        dispatch(changeConnectSlice());
      }
    });
    return () => unsubscribe();
  }, [isConnected]);

  useEffect(() => {
    if (!hostStaticResource) {
      const options: any = {
        isShowLoading: false,
      };
      dispatch(getConfig(options));
    }
  }, []);

  useEffect(() => {
    if (!lengthListCity) {
      const options: any = {
        isShowLoading: false,
      };
      dispatch(getCity(options));
    }
  }, []);

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor="transparent"
      />
      <RootStack />
      {isLoading && <Loading />}
      {!isConnected && <Internet />}
      {isError && <Error />}
      <Toast config={toastConfig} position="bottom" visibilityTime={3000} />
    </>
  );
};
export default RootApp;
