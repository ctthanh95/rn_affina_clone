import React from 'react';
import View from './view';
import {useAppDispatch} from '@hooks/redux';
import {signOut} from 'src/redux/sagas/auth/signOut';

const Setting = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(signOut());
  };
  return <View onLogout={handleLogout} />;
};

export default Setting;
