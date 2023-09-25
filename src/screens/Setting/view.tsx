import React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {
  AppText,
  AppView,
  AuthInfomation,
  Container,
  Gradient,
} from '@components';
import MenuSetting from './components/MenuSetting';
import styles from './styles';
import {ms} from '@utils/responsive';
import {BUTTON} from '@utils/fontStyle';
import {PINK, PRIMARY} from '@utils/colors';
import {ACCOUNT_SETTING, SYSTEM_INFOMATION} from '@utils/constants';

type Props = {
  onLogout: () => void;
};

const View = ({onLogout}: Props) => {
  return (
    <Container>
      <AuthInfomation isGradient={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        alwaysBounceVertical={false}
        bounces={false}>
        <Gradient />
        <AppView paddingHorizontal={ms(23)}>
          <MenuSetting title="Thiết lập tài khoản" data={ACCOUNT_SETTING} />
          <MenuSetting
            title="Thông tin Hệ thống"
            data={SYSTEM_INFOMATION}
            isPrimaryTitle={true}
          />
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.button}
            onPress={onLogout}>
            <AppText style={BUTTON[16]} color={PRIMARY}>
              ĐĂNG XUẤT
            </AppText>
          </TouchableOpacity>
          {/* <TouchableOpacity
            activeOpacity={0.9}
            style={styles.button}
            onPress={onLogout}>
            <AppText style={BUTTON[16]} color={PINK}>
              XOÁ TÀI KHOẢN
            </AppText>
          </TouchableOpacity> */}
        </AppView>
      </ScrollView>
    </Container>
  );
};

export default View;
