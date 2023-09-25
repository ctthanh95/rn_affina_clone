import React from 'react';
import {StyleSheet} from 'react-native';
import {AppView, AppText} from '@components';
import {BACKGROUND, BLACK, WHITE} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {ms} from '@utils/responsive';

type Props = {
  saleSetBy: any;
};

const Agency = ({saleSetBy}: Props) => (
  <AppView style={styles.container}>
    <AppText style={CONTENT.bold_12} color={BLACK[100]}>
      Phụ trách bởi
    </AppText>
    <AppText style={CONTENT.semibold_12} color={BLACK[100]}>
      {saleSetBy}
    </AppText>
  </AppView>
);

export default Agency;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: WHITE,
    borderTopWidth: 1,
    borderTopColor: BACKGROUND,
    padding: ms(12),
  },
});
