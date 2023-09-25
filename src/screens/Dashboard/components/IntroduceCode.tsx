import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {isEmpty} from 'lodash';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {AppButton, AppText, AppTextInput, AppView} from '@components';
import {ms, vs} from '@utils/responsive';
import {CONTENT} from '@utils/fontStyle';
import {BLACK} from '@utils/colors';

type Props = {
  introduceCode: string;
  setIntroduceCode: (text: string) => void;
};

const IntroduceCode = ({introduceCode, setIntroduceCode}: Props) => {
  const disabled = isEmpty(introduceCode.trim());
  return (
    <AppView paddingHorizontal={ms(23)}>
      <AppText color={BLACK[30]} style={CONTENT.bold_14}>
        NHẬP MÃ CỦA ĐỒNG NGHIỆP
      </AppText>
      <AppView
        marginTop={ms(8)}
        marginBottom={ms(20)}
        alignCenter
        borderWidth={1}
        radius={ms(20)}
        borderColor={BLACK[3]}
        backgroundColor={BLACK[3]}
        paddingHorizontal={ms(16)}>
        <BottomSheetTextInput
          style={styles.input}
          value={introduceCode}
          onChangeText={setIntroduceCode}
        />
      </AppView>
      <AppButton title="Lưu" disabled={disabled} />
    </AppView>
  );
};

export default IntroduceCode;

const styles = StyleSheet.create({
  input: {
    color: BLACK[100],
    height: vs(48),
    width: '100%',
    ...CONTENT.medium_16,
  },
});
