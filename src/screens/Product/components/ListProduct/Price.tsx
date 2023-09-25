import React from 'react';
import {AppView, AppText} from '@components';
import {LIGHT_BACKGROUND, PRIMARY} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {numberWithCommas} from '@utils/global';
import {ms} from '@utils/responsive';

type Props = {
  data: any;
};

const Price = ({data}: Props) => {
  const lengthData = data?.length;
  if (lengthData) {
    data.sort((a: any, b: any) => b.fee - a.fee);
  }
  const minPrice = data[0]?.fee || 0;
  return (
    <AppView
      paddingVertical={ms(12)}
      row
      justifySpaceBetween
      paddingHorizontal={ms(16)}
      alignCenter
      backgroundColor={LIGHT_BACKGROUND}>
      <AppText style={CONTENT.semibold_12} color={PRIMARY}>
        Giá từ
      </AppText>
      <AppText style={CONTENT.bold_16} color={PRIMARY}>
        {numberWithCommas(minPrice)} đ
      </AppText>
    </AppView>
  );
};

export default Price;
