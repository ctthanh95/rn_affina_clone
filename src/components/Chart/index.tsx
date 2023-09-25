import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppView from '../AppView';
import {ms, vs} from '@utils/responsive';
import {WHITE} from '@utils/colors';
import AppText from '../AppText';

type Props = {};

const Chart = (props: Props) => {
  return (
    <AppView marginBottom={ms(24)}>
      <AppView height={vs(216)} radius={ms(32)} backgroundColor={WHITE} center>
        <AppText>Chart</AppText>
      </AppView>
    </AppView>
  );
};

export default Chart;

const styles = StyleSheet.create({});
