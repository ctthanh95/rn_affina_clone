import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {isEmpty} from 'lodash';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {AppView, AppTextInput, AppButton} from '@components';
import {ms} from '@utils/responsive';
import {WHITE} from '@utils/colors';

type Props = {
  introduceCode: string;
  setIntroduceCode: (text: string) => void;
};

const IntroduceCode = ({introduceCode, setIntroduceCode}: Props) => {
  const disabled = isEmpty(introduceCode.trim());
  const isIos = Platform.OS === 'ios';
  return (
    <AppView
      paddingHorizontal={ms(23)}
      paddingVertical={ms(12)}
      backgroundColor={WHITE}>
      <AppTextInput
        label="NHẬP MÃ CỦA ĐỒNG NGHIỆP"
        value={introduceCode}
        onChangeText={setIntroduceCode}
      />
      <AppButton title="Lưu" disabled={disabled} />
      <KeyboardSpacer topSpacing={isIos ? 0 : -150} />
    </AppView>
  );
};

export default IntroduceCode;

const styles = StyleSheet.create({});
