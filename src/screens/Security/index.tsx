import React from 'react';
import View from './view';
import {goBack} from '@navigation/RootNavigation';
import {useRoute} from '@react-navigation/native';
import {hashRSA} from '@utils/global';
import {useAppDispatch} from '@hooks/redux';
import {changePassword} from 'src/redux/sagas/auth/changePassword';

const Security = () => {
  const dispatch = useAppDispatch();
  const routes = useRoute();
  const {token, type, username} = routes.params as any;

  const SetPassword = (code: string) => {
    const options: any = {
      dataPost: {token, password: hashRSA(code)},
      username,
    };
  };

  const ForgetPassword = (code: string) => {
    const options: any = {
      dataPost: {token, password: hashRSA(code)},
      username,
      callbackSuccess: () => {
        goBack();
      },
    };
    dispatch(changePassword(options));
  };

  const handleSubmit = (code: string) => {
    if (type === 'register') SetPassword(code);

    if (type === 'forgotPass') ForgetPassword(code);

    // navigate(SIGN_IN);
  };
  return <View onSubmit={handleSubmit} />;
};

export default Security;
