import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppView, AppText} from '@components';
import {BLACK} from '@utils/colors';
import {TITLE} from '@utils/fontStyle';
import {ms} from '@utils/responsive';
import ListSideBenefit from './ListSideBenefit';

type Props = {
  data: any;
  onSetFee: (isSelectes: boolean, money: number, id: string) => void;
};

const SideBenefit = ({data, onSetFee}: Props) => {
  return (
    <AppView marginTop={ms(16)}>
      <AppText style={TITLE[20]} color={BLACK[50]} marginBottom={ms(16)}>
        Quyền Lợi Bổ Sung
      </AppText>
      <ListSideBenefit data={data} onSetFee={onSetFee} />
    </AppView>
  );
};

export default SideBenefit;

const styles = StyleSheet.create({});
