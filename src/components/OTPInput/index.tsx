import React, {useRef, useState, useEffect} from 'react';
import {Pressable, StyleSheet, TextInput} from 'react-native';
import AppView from '../AppView';
import AppText from '../AppText';
import {ms, s, vs} from '@utils/responsive';
import {SELECT_BUTTON, BLACK} from '@utils/colors';
import {HEADING} from '@utils/fontStyle';
import {OTP_LENGTH} from '@utils/constants';

type Props = {
  code: string;
  setCode: (code: string) => void;
  maximumLength?: number;
  setIsPinReady: (isReady: boolean) => void;
  isShowCode?: boolean;
  isAutoFocus?: boolean;
};

const OTPInput = ({
  code,
  setCode,
  maximumLength = OTP_LENGTH,
  setIsPinReady,
  isShowCode = false,
  isAutoFocus = false,
}: Props) => {
  const boxArray = new Array(maximumLength).fill(0);
  const inputRef = useRef();
  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef?.current.focus();
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  useEffect(() => {
    // update pin ready status
    setIsPinReady(code.length === maximumLength);
    // clean up function
    return () => {
      setIsPinReady(false);
    };
  }, [code]);
  const boxDigit = (_, index) => {
    const emptyInput = '';
    const digit = code[index] || emptyInput;
    const isEmptyDigit = digit === emptyInput;
    return (
      <AppView key={index}>
        {isShowCode && !isEmptyDigit ? (
          <AppText style={styles.splitBoxText}>{digit}</AppText>
        ) : (
          <AppView
            style={isEmptyDigit ? styles.splitBoxes : styles.splitBoxesHidden}
          />
        )}
      </AppView>
    );
  };

  return (
    <AppView alignCenter justifyCenter>
      <Pressable onPress={handleOnPress} style={styles.splitOTP}>
        {boxArray.map(boxDigit)}
      </Pressable>
      <TextInput
        value={code}
        onChangeText={setCode}
        maxLength={maximumLength}
        ref={inputRef}
        onBlur={handleOnBlur}
        style={styles.textInputHidden}
        keyboardType="number-pad"
        autoFocus={isAutoFocus}
      />
    </AppView>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  splitOTP: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-end',
    height: vs(50),
  },
  textInputHidden: {
    position: 'absolute',
    opacity: 0,
    // width: 300,
    // borderColor: 'red',
    // borderWidth: 1,
    // borderRadius: 5,
    // padding: 15,
    // marginTop: 50,
    // color: 'white',
  },
  splitBoxes: {
    width: s(16),
    height: vs(12),
    borderRadius: ms(4),
    backgroundColor: BLACK[10],
  },
  splitBoxesHidden: {
    width: s(16),
    height: vs(12),
    borderRadius: ms(4),
    backgroundColor: SELECT_BUTTON,
  },
  splitBoxText: {
    ...HEADING[36],
    color: BLACK[100],
  },
});
