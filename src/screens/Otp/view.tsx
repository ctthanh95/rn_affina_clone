import React, {useEffect, useState} from 'react';
import {
  AppButton,
  Container,
  AppText,
  AppView,
  DismissKeyboard,
  OTPInput,
  PublicTitle,
} from '@components';
import {ms} from '@utils/responsive';
import {BLACK, PRIMARY} from '@utils/colors';
import {CONTENT, LINK} from '@utils/fontStyle';
import {TouchableOpacity} from 'react-native';

type Props = {
  onSubmit: (pin: string) => void;
  timeCodeExpire: number;
};

const formatSencond = (time: number) => {
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;
  let m = minutes.toString().padStart(2, '0');
  let s = seconds.toString().padStart(2, '0');
  return `${m}:${s}`;
};

const View = ({onSubmit, timeCodeExpire}: Props) => {
  const [otpCode, setOTPCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    setTimer(timeCodeExpire);
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(previousState => {
        if (previousState === 0) {
          clearInterval(interval);
          return 0;
        }
        return previousState - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleReSend = () => {
    setTimer(timeCodeExpire);
  };

  return (
    <Container isPublic>
      <DismissKeyboard>
        <AppView
          flex
          paddingHorizontal={23}
          marginTop={ms(56)}
          justifySpaceBetween>
          <AppView>
            <PublicTitle
              title="Nhập Mã OTP"
              description="Chúng tôi vừa gửi mã OTP, hãy nhập nó vào bên dưới."
            />
            <OTPInput
              code={otpCode}
              setCode={setOTPCode}
              setIsPinReady={setIsPinReady}
              isShowCode={true}
            />
            <AppView marginTop={ms(48)} row alignCenter>
              <AppText
                style={CONTENT.medium_14}
                color={BLACK[50]}
                marginRight={ms(8)}>
                Không nhận được mã OTP?
              </AppText>
              {timer > 0 ? (
                <AppText style={CONTENT.bold_14} color={BLACK[100]}>
                  {formatSencond(timer).toUpperCase()}
                </AppText>
              ) : (
                <TouchableOpacity activeOpacity={0.9} onPress={handleReSend}>
                  <AppText style={LINK[14]} color={PRIMARY}>
                    Gửi lại mã OTP
                  </AppText>
                </TouchableOpacity>
              )}
            </AppView>
          </AppView>
          <AppButton
            title="Tiếp tục"
            onPress={() => onSubmit(otpCode)}
            disabled={!isPinReady}
          />
        </AppView>
      </DismissKeyboard>
    </Container>
  );
};

export default View;
