import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import AppView from '../AppView';
import AppText from '../AppText';
import {CONTENT} from '@utils/fontStyle';
import {BLACK, RED} from '@utils/colors';
import {ms, vs} from '@utils/responsive';

type Props = {
  label?: string;
  labelRight?: string | JSX.Element | JSX.Element[];
  contentLeft?: string | JSX.Element | JSX.Element[];
  contentRight?: string | JSX.Element | JSX.Element[];
  error?: any;
  marginBottom?: number;
  placeholder?: string;
  maxLength?: number;
  keyboardType?: string;
  editable?: boolean;
  onBlur?: any;
  onChangeText?: any;
  value?: string;
};

const AppTextInput = ({
  label,
  labelRight,
  contentLeft,
  contentRight,
  error,
  marginBottom = 20,
  ...props
}: Props) => {
  return (
    <AppView marginBottom={ms(marginBottom)}>
      <AppView row justifySpaceBetween alignCenter>
        {label && <AppText style={styles.label}>{label.toUpperCase()}</AppText>}
        {labelRight && labelRight}
      </AppView>
      <AppView style={styles.wrap}>
        {contentLeft && contentLeft}
        <TextInput
          placeholderTextColor={BLACK[30]}
          style={styles.input}
          {...props}
        />
        {contentRight && contentRight}
      </AppView>
      {error && <AppText style={styles.error}>{error}</AppText>}
    </AppView>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  label: {
    color: BLACK[30],
    paddingLeft: ms(4),
    ...CONTENT.bold_14,
  },
  wrap: {
    marginTop: ms(8),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: ms(1),
    borderRadius: ms(20),
    borderColor: BLACK[3],
    backgroundColor: BLACK[3],
    paddingHorizontal: ms(16),
  },
  input: {
    flex: 1,
    color: BLACK[100],
    height: vs(48),
    ...CONTENT.medium_16,
  },
  error: {
    color: RED,
    paddingLeft: ms(4),
    fontSize: ms(12),
    marginTop: ms(4),
  },
});
