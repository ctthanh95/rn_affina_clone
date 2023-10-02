import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Container, AppView, AppSwitch, AppText} from '@components';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {selectIsBiometrics, setBiometrics} from '@slices/authSlice';
import {BLACK, WHITE} from '@utils/colors';
import {ms} from '@utils/responsive';
import {Right} from '@utils/svg';
import {CONTENT} from '@utils/fontStyle';
import {boolean} from 'yup';

const View = () => {
  const dispatch = useAppDispatch();
  const isBiometrics = useAppSelector(selectIsBiometrics);
  const valueIsBiometrics = Boolean(isBiometrics);
  const handleSwitch = () => {
    dispatch(setBiometrics(!valueIsBiometrics));
  };
  return (
    <Container isAuth title="Cài đặt bảo mật">
      <AppView flex paddingHorizontal={ms(23)}>
        <AppSwitch
          title="Sử dụng sinh trắc học"
          value={valueIsBiometrics}
          onValueChange={handleSwitch}
        />
        <TouchableOpacity activeOpacity={0.9}>
          <AppView
            row
            alignCenter
            justifySpaceBetween
            backgroundColor={WHITE}
            marginVertical={ms(12)}
            radius={ms(20)}
            padding={ms(16)}>
            <AppText style={CONTENT.bold_16} color={BLACK[100]}>
              Thay đổi mã pin
            </AppText>
            <Right />
          </AppView>
        </TouchableOpacity>
      </AppView>
    </Container>
  );
};

export default View;
