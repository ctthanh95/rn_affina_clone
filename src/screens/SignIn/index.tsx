import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import RNBiometrics from 'react-native-simple-biometrics';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {navigate, replace} from '@navigation/RootNavigation';
import {AUTH_STACK, OTP} from '@navigation/screens';
import {hashRSA} from '@utils/global';
import {signIn} from 'src/redux/sagas/auth/signIn';
import {
  selectIsBiometrics,
  selectPassword,
  selectUsername,
  setBiometrics,
  setPassword,
} from '@slices/authSlice';
import {forgetPassword} from 'src/redux/sagas/auth/forgetPassword';
import View from './view';

const SignIn = () => {
  const dispatch = useAppDispatch();

  const route: any = useRoute();

  const username = useAppSelector(selectUsername);
  const isBiometrics = useAppSelector(selectIsBiometrics);
  const password = useAppSelector(selectPassword);

  const phone = route.params?.phone;
  const checkPhone = phone ? phone : username;

  const [otpCode, setOTPCode] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
    dispatch(setBiometrics(false));
    replace(AUTH_STACK);
  };

  const handleApcept = () => {
    setIsModalVisible(false);
    dispatch(setBiometrics(true));
    dispatch(setPassword(otpCode));
    replace(AUTH_STACK);
  };

  const handleToggleModal = () => {
    setIsModalVisible(!isModalVisible);
    if (isModalVisible) replace(AUTH_STACK);
  };

  const handleSubmit = (pin: string) => {
    const option: any = {
      dataPost: {
        username: checkPhone,
        password: hashRSA(pin),
        pushKey: '',
      },
      callbackResetCode: () => {
        setOTPCode('');
      },
      callbackSuccess: () => {
        if (isBiometrics === null) {
          handleToggleModal();
        } else {
          replace(AUTH_STACK);
        }
      },
    };
    dispatch(signIn(option));
  };
  const handleOtp = () => {
    const option: any = {
      phone: checkPhone,
      callbackSuccess: (response: any) => {
        navigate(OTP, {
          ...response,
          phone: checkPhone,
          type: 'forgotPass',
        });
      },
    };
    dispatch(forgetPassword(option));
  };

  const handleBiometrics = async () => {
    const can = await RNBiometrics.canAuthenticate();
    if (can && isBiometrics && password) {
      try {
        await RNBiometrics.requestBioAuth(
          'Xác thực',
          'Xác thực danh tính để đăng nhập',
        );
        const option: any = {
          dataPost: {
            username: checkPhone,
            password: hashRSA(password),
            pushKey: '',
          },
          callbackResetCode: () => {},
          callbackSuccess: () => {
            replace(AUTH_STACK);
          },
        };
        dispatch(signIn(option));
      } catch (error) {
        console.log('handleBiometrics error');
      }
    }
  };

  useEffect(() => {
    handleBiometrics();
  }, []);

  return (
    <View
      otpCode={otpCode}
      isModalVisible={isModalVisible}
      onSubmit={handleSubmit}
      onOtp={handleOtp}
      setOTPCode={setOTPCode}
      onToggleModal={handleToggleModal}
      onCancel={handleCancel}
      onApcept={handleApcept}
    />
  );
};

export default SignIn;
