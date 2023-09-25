import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import DatePickerLibrary from 'react-native-date-picker';
import {isEmpty} from 'lodash';
import {Calender, Down} from '@utils/svg';
import AppView from '../AppView';
import AppText from '../AppText';
import {BLACK, RED} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {ms, vs} from '@utils/responsive';
import {formatTime} from '@utils/global';

type Props = {
  value: any;
  error?: any;
  placeholder?: string;
  isMarginBottom?: boolean;
  onPress: () => void;
};

const Province = ({
  value,
  error,
  placeholder,
  isMarginBottom = false,
  onPress,
}: Props) => {
  const isEmptyValue = isEmpty(value);

  return (
    <>
      <TouchableOpacity
        style={[isMarginBottom && styles.container]}
        activeOpacity={0.9}
        onPress={onPress}>
        <AppView style={styles.wrap}>
          <AppText
            style={styles.input}
            color={isEmptyValue ? BLACK[30] : BLACK[100]}>
            {isEmptyValue ? placeholder : value}
          </AppText>
          <Down />
        </AppView>
        {error && <AppText style={styles.error}>{error}</AppText>}
      </TouchableOpacity>
    </>
  );
};

export default Province;

const styles = StyleSheet.create({
  container: {
    marginBottom: ms(20),
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
