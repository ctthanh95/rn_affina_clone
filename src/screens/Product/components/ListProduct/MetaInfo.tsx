import React from 'react';
import {StyleSheet} from 'react-native';
import {AppView, AppImage, AppText} from '@components';
import {BLACK} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {getColorBonus} from '@utils/global';
import {ms, s, vs} from '@utils/responsive';

type Props = {
  uri: string;
  bonusPercent: number;
};

const MetaInfo = ({uri, bonusPercent}: Props) => {
  return (
    <AppView row>
      <AppImage uri={uri} style={styles.imageLogo} resizeMode="contain" />
      <AppView flex justifyCenter alignEnd paddingHorizontal={ms(8)}>
        <AppText style={CONTENT.semibold_12} color={BLACK[100]}>
          Hoa hồng lên đến
        </AppText>
        <AppText style={CONTENT.semibold_12} color={BLACK[30]}>
          (không bao gồm thuế)
        </AppText>
      </AppView>
      <AppView
        borderTopLeftRadius={ms(8)}
        borderBottomLeftRadius={ms(8)}
        width={s(65)}
        height={vs(40)}
        backgroundColor={getColorBonus(bonusPercent)}
        center>
        <AppText style={CONTENT.bold_16} color={BLACK[100]}>
          {bonusPercent ? `${bonusPercent}%` : ''}
        </AppText>
      </AppView>
    </AppView>
  );
};

export default MetaInfo;

const styles = StyleSheet.create({
  imageLogo: {
    width: s(65),
    height: vs(40),
  },
});
