import React from 'react';
import {
  AppText,
  AppTextInput,
  AppView,
  AppButton,
  Container,
  DismissKeyboard,
  PublicTitle,
} from '@components';
import {ms} from '@utils/responsive';
import styles from './styles';
import {CONTENT} from '@utils/fontStyle';

type Props = {
  onSubmit: () => void;
};

const View = ({onSubmit}: Props) => {
  return (
    <Container isPublic>
      <DismissKeyboard>
        <AppView
          flex
          paddingHorizontal={ms(23)}
          marginTop={ms(56)}
          justifySpaceBetween>
          <AppView>
            <PublicTitle
              title="Mã Giới Thiệu"
              description="Bạn là thành viên của tổ chức, vui lòng nhập vào mã giới thiệu từ cấp quản lý."
            />
            <AppTextInput
              // error
              label="Mã giới thiệu"
            />
            <AppText style={[styles.scan, CONTENT.bold_16]}>SCAN MÃ</AppText>
          </AppView>
          <AppButton title="Tiếp tục" onPress={onSubmit} />
        </AppView>
      </DismissKeyboard>
    </Container>
  );
};

export default View;
