import React from 'react';
import View from './view';
import {navigate} from '@navigation/RootNavigation';
import {OTP, SIGN_IN} from '@navigation/screens';
import {useAppDispatch} from '@hooks/redux';
import {checkPhoneLogin} from 'src/redux/sagas/auth/checkPhoneLogin';
import {formatPhoneNumber} from '@utils/global';

const SignUp = () => {
  const dispatch = useAppDispatch();
  const handleSubmit = (formData: any) => {
    const phone = formatPhoneNumber(formData.phoneNumber);
    let options = {
      phone,
      callbackLogin: () => {
        navigate(SIGN_IN, {phone});
      },
      callbackRegister: (response: any) => {
        navigate(OTP, {...response, phone, type: 'register'});
      },
    };
    dispatch(checkPhoneLogin(options));
  };
  return <View onSubmit={handleSubmit} />;
};

export default SignUp;
