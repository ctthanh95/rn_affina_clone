import React, {useEffect, useState} from 'react';
import {
  Container,
  AppText,
  AppView,
  DismissKeyboard,
  PublicTitle,
  OTPInput,
  Popup,
  AppButton,
} from '@components';
import {ms} from '@utils/responsive';
import {CONTENT} from '@utils/fontStyle';
import styles from './styles';
import {Fingerprint} from '@utils/svg';

type Props = {
  otpCode: string;
  isModalVisible: boolean;
  onSubmit: (pin: string) => void;
  onOtp: () => void;
  setOTPCode: (otpCode: string) => void;
  onToggleModal: () => void;
  onCancel: () => void;
  onApcept: () => void;
};

const View = ({
  isModalVisible,
  otpCode,
  onOtp,
  setOTPCode,
  onCancel,
  onApcept,
  onSubmit,
  onToggleModal,
}: Props) => {
  const [isPinReady, setIsPinReady] = useState(false);
  useEffect(() => {
    if (isPinReady) onSubmit(otpCode);
  }, [isPinReady]);

  return (
    <>
      <Container>
        <DismissKeyboard>
          <AppView flex paddingHorizontal={ms(23)} marginTop={ms(140)}>
            <PublicTitle title="Nhập mã pin" />
            <OTPInput
              code={otpCode}
              setCode={setOTPCode}
              setIsPinReady={setIsPinReady}
              isAutoFocus={true}
            />
            <AppText style={[CONTENT.bold_16, styles.forget]} onPress={onOtp}>
              QUÊN MÃ PIN?
            </AppText>
          </AppView>
        </DismissKeyboard>
      </Container>
      <Popup
        isModalVisible={isModalVisible}
        onToggleModal={onToggleModal}
        title="Sử dụng Face ID"
        content="Cho phép ứng dụng sẻ dụng Face ID để đăng nhập và tài khoản"
        icon={<Fingerprint />}
        footer={
          <AppView row>
            <AppView flex>
              <AppButton title="Không" onPress={onCancel} />
            </AppView>
            <AppView width={ms(12)} />
            <AppView flex>
              <AppButton title="Đồng ý" onPress={onApcept} />
            </AppView>
          </AppView>
        }
      />
    </>
  );
};

export default View;
