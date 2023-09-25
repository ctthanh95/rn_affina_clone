import {View, Text, AppButton} from 'react-native';
import React, {useEffect, useState} from 'react';
import {navigate} from '@navigation/RootNavigation';
import {useTranslation} from 'react-i18next';
import {AUTH_STACK, PUBLIC_STACK} from '@navigation/screens';
import {useAppDispatch} from '@hooks/redux';

import i18next from 'i18next';
import {sagaActions} from 'src/redux/actions';

type Props = {};

const Login = (props: Props) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const [arr, setArr] = useState([]);
  const [arr2, setArr2] = useState([]);

  const onPress = () => {};

  useEffect(() => {}, []);

  useEffect(() => {}, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>{t('dummyNamespace.medium')}</Text>
      <AppButton title="aaa" />
    </View>
  );
};

export default Login;
