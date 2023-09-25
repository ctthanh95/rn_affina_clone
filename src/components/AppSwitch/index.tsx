import React from 'react';
import {StyleSheet, Switch} from 'react-native';
import AppText from '../AppText';
import AppView from '../AppView';
import {BLACK, LIGHT_BACKGROUND, SELECT_BUTTON, WHITE} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {ms} from '@utils/responsive';

type Props = {
  title: string;
  value: boolean;
  onValueChange: () => void;
};

const AppSwitch = ({title, value, onValueChange}: Props) => {
  return (
    <AppView row justifySpaceBetween alignCenter marginVertical={ms(12)}>
      <AppText style={CONTENT.semibold_16} color={BLACK[100]}>
        {title}
      </AppText>
      <Switch
        style={styles.switch}
        trackColor={{false: LIGHT_BACKGROUND, true: SELECT_BUTTON}}
        thumbColor={WHITE}
        ios_backgroundColor={LIGHT_BACKGROUND}
        onValueChange={onValueChange}
        value={value}
      />
    </AppView>
  );
};

export default AppSwitch;

const styles = StyleSheet.create({
  switch: {transform: [{scaleX: 0.8}, {scaleY: 0.8}]},
});
