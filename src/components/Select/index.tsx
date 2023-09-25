import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Down} from '@utils/svg';
import AppView from '../AppView';
import AppText from '../AppText';
import {BLACK, RED} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {ms, vs} from '@utils/responsive';
import {formatTime} from '@utils/global';
import {RELATIONSHIP_TYPE} from '@utils/constants';

type Props = {
  value: number;
  label?: string;
  error?: any;
  onChange: (date: number) => void;
  onPress: () => void;
};

const Select = ({value = 5, label, error, onChange, onPress}: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={onPress}>
      {label && <AppText style={styles.label}>{label.toUpperCase()}</AppText>}
      <AppView style={styles.wrap}>
        <AppText style={styles.input} color={value ? BLACK[100] : BLACK[30]}>
          {RELATIONSHIP_TYPE[value]}
        </AppText>
        <Down />
      </AppView>
      {error && <AppText style={styles.error}>{error}</AppText>}
    </TouchableOpacity>
  );
};

export default Select;

const styles = StyleSheet.create({
  container: {
    marginBottom: ms(20),
  },
  label: {
    ...CONTENT.bold_14,
    color: BLACK[30],
    paddingLeft: ms(4),
  },
  wrap: {
    marginTop: ms(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: ms(1),
    borderRadius: ms(20),
    borderColor: BLACK[3],
    backgroundColor: BLACK[3],
    paddingHorizontal: ms(16),
    height: vs(48),
  },
  input: {
    flex: 1,
    ...CONTENT.medium_16,
  },
  error: {
    color: RED,
    paddingLeft: ms(4),
    fontSize: ms(12),
    marginTop: ms(4),
  },
});
