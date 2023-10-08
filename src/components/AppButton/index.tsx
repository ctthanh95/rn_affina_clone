import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import AppText from '../AppText';
import {DISABLE_BUTTON, PRIMARY, WHITE} from '@utils/colors';
import {ms} from '@utils/responsive';
import {BUTTON} from '@utils/fontStyle';

type Props = {
  title: string;
  onPress?: any | undefined;
  disabled?: boolean | undefined;
};

const AppButton = ({title, onPress, disabled = false}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.9}
      style={[
        styles.container,
        {
          backgroundColor: disabled ? DISABLE_BUTTON : PRIMARY,
        },
      ]}>
      <AppText style={BUTTON[14]} color={WHITE}>
        {title.toUpperCase()}
      </AppText>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: PRIMARY,
    borderRadius: ms(16),
    alignItems: 'center',
    justifyContent: 'center',
    height: ms(56),
    marginBottom: ms(20),
    width: '100%',
  },
});
