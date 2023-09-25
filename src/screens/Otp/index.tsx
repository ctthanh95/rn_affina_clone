import React from 'react';
import View from './view';
import {replace} from '@navigation/RootNavigation';
import {SECURITY} from '@navigation/screens';
import {useRoute} from '@react-navigation/native';
import {useAppDispatch} from '@hooks/redux';
import {submitOtp} from 'src/redux/sagas/auth/submitOtp';

const Otp = () => {
  const routes = useRoute();
  const {otpKey, timeCodeExpire, phone, type} = routes.params;
  const dispatch = useAppDispatch();

  const handleSubmit = (code: string) => {
    let options = {
      dataPut: {
        code,
        otpKey: otpKey ?? '',
      },
      callbackSuccess: (token: string) => {
        replace(SECURITY, {
          username: phone,
          type,
          token,
        });
      },
    };
    dispatch(submitOtp(options));
  };
  return (
    <View onSubmit={handleSubmit} timeCodeExpire={timeCodeExpire / 1000} />
  );
};

export default Otp;
