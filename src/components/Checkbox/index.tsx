import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AppView from '../AppView';
import {ms} from '@utils/responsive';
import {SELECT_BUTTON, BLACK} from '@utils/colors';
import AppText from '../AppText';
import {CONTENT} from '@utils/fontStyle';
import {Check} from '@utils/svg';

type Props = {
  isChecked: boolean;
  onCheckbox: () => void;
  children: string | JSX.Element | JSX.Element[];
};

const Checkbox = ({isChecked, onCheckbox, children}: Props) => {
  return (
    <AppView style={styles.container}>
      <TouchableOpacity activeOpacity={0.9} onPress={onCheckbox}>
        <AppView style={isChecked ? styles.check : styles.unCheck}>
          {isChecked && <Check />}
        </AppView>
      </TouchableOpacity>
      <AppView flex>{children}</AppView>
    </AppView>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unCheck: {
    height: ms(20),
    width: ms(20),
    borderRadius: ms(8),
    borderWidth: 1,
    backgroundColor: BLACK[3],
    borderColor: BLACK[3],
    marginRight: ms(8),
  },

  check: {
    backgroundColor: SELECT_BUTTON,
    borderColor: SELECT_BUTTON,
    height: ms(20),
    width: ms(20),
    borderRadius: ms(8),
    marginRight: ms(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
