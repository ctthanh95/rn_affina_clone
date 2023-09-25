import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {
  Container,
  DismissKeyboard,
  AppView,
  PublicTitle,
  OTPInput,
} from '@components';
import {ms} from '@utils/responsive';

type Props = {
  onSubmit: (code: string) => void;
};

const View = ({onSubmit}: Props) => {
  const [pin_1, setPin_1] = useState('');
  const [pin_2, setPin_2] = useState('');
  const [isFirst, setIsFirst] = useState(true);
  const [isPinReady, setIsPinReady] = useState(false);

  const hanleSubmit = () => {
    if (pin_1 === pin_2) {
      onSubmit(pin_1);
    } else {
      setPin_2('');
      Alert.alert('Not matching');
    }
  };

  let description = isFirst
    ? 'Tạo một mã PIN giúp bảo vệ tài khoản của bạn khỏi bị truy cập trái phép'
    : 'Xác nhận mã PIN bạn vừa tạo bằng cách nhập mã lại một lần nữa';
  let code = isFirst ? pin_1 : pin_2;
  let setCode = isFirst ? setPin_1 : setPin_2;

  useEffect(() => {
    if (isFirst && isPinReady) {
      setIsFirst(false);
    }
    if (!isFirst && isPinReady) {
      hanleSubmit();
    }
  }, [isPinReady]);

  return (
    <Container>
      <DismissKeyboard>
        <AppView
          flex
          paddingHorizontal={23}
          marginTop={ms(140)}
          justifySpaceBetween>
          <AppView>
            <PublicTitle title="Bảo Mật" description={description} />
            <OTPInput
              code={code}
              setCode={setCode}
              setIsPinReady={setIsPinReady}
              isAutoFocus={true}
            />
          </AppView>
        </AppView>
      </DismissKeyboard>
    </Container>
  );
};

export default View;
