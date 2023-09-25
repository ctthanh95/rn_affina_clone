import React from 'react';
import {StyleSheet} from 'react-native';
import {QRCode} from 'react-native-custom-qr-codes';
import {AppImage, AppView} from '@components';
import {useAppSelector} from '@hooks/redux';
import {selectUserData} from '@slices/authSlice';
import {BACKGROUND, WHITE} from '@utils/colors';
import {ms, s} from '@utils/responsive';

type Props = {
  link: string;
};

const QR = ({link}: Props) => {
  const userData: any = useAppSelector(selectUserData);
  const avatar = userData?.avatar;
  return (
    <AppView center>
      <QRCode content={link} codeStyle="circle" backgroundColor={BACKGROUND} />
      <AppView absolute center>
        <AppImage uri={avatar} style={styles.image} />
      </AppView>
    </AppView>
  );
};

export default QR;

const styles = StyleSheet.create({
  image: {
    width: s(68),
    height: s(68),
    borderRadius: s(34),
    borderWidth: ms(4),
    borderColor: WHITE,
  },
});
