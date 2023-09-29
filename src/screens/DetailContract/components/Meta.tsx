import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {AppText, AppView} from '@components';
import {ms} from '@utils/responsive';
import {BLACK, LIGHT_BACKGROUND, SELECT_BUTTON, WHITE} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {numberWithCommas} from '@utils/global';

type TMeta = {
  data: any;
  amountPay: number;
  periodLable: string;
};

const Item = ({item, index}: any) => {
  const backgroundColor = index % 2 === 0 ? LIGHT_BACKGROUND : WHITE;
  return (
    <AppView
      row
      justifySpaceBetween
      paddingVertical={ms(12)}
      paddingHorizontal={ms(16)}
      backgroundColor={backgroundColor}>
      <AppText style={CONTENT.medium_12} color={BLACK[100]} flex>
        {item?.name}
      </AppText>
      <AppText style={CONTENT.bold_14} color={BLACK[100]} marginLeft={ms(8)}>
        {numberWithCommas(item?.value)} đ
      </AppText>
    </AppView>
  );
};

const Meta = ({data, amountPay, periodLable}: TMeta) => {
  const formatData = useMemo(() => {
    const result = data.map((item: any) => {
      const listMaximumAmountMainBenefit = item?.listMaximumAmountMainBenefit
        ? item?.listMaximumAmountMainBenefit[0]
        : {};
      const listFeeAndMaximumAmountSideBenefit =
        item?.listFeeAndMaximumAmountSideBenefit
          ? item?.listFeeAndMaximumAmountSideBenefit[0]
          : {};
      const value =
        listMaximumAmountMainBenefit?.maximumAmount ||
        listFeeAndMaximumAmountSideBenefit?.maximumAmount ||
        '';
      return {
        id: item.id,
        name: item.name,
        value,
      };
    });
    return result;
  }, [data]);
  const backgroundColor = formatData.length % 2 == 0 ? LIGHT_BACKGROUND : WHITE;

  return (
    <AppView>
      <AppText
        style={CONTENT.bold_12}
        color={BLACK[30]}
        marginBottom={ms(16)}
        marginLeft={ms(16)}>
        QUYỀN LỢI ĐƯỢC BẢO HIỂM
      </AppText>
      <AppView style={styles.list}>
        <FlashList
          data={formatData}
          renderItem={Item}
          estimatedItemSize={200}
          keyExtractor={(item: any) => item.id}
        />
      </AppView>
      <AppView
        row
        justifySpaceBetween
        backgroundColor={backgroundColor}
        paddingVertical={ms(12)}
        paddingHorizontal={ms(16)}>
        <AppText style={CONTENT.bold_12} color={BLACK[100]} flex>
          Thời hạn bảo hiểm
        </AppText>
        <AppText style={CONTENT.bold_14} color={BLACK[100]} marginLeft={ms(8)}>
          {periodLable}
        </AppText>
      </AppView>
      <AppView
        row
        justifySpaceBetween
        backgroundColor={SELECT_BUTTON}
        padding={ms(16)}>
        <AppText style={CONTENT.semibold_16} color={WHITE}>
          Phí bảo hiểm
        </AppText>
        <AppText style={CONTENT.bold_16} color={WHITE} marginLeft={ms(8)}>
          {numberWithCommas(amountPay)} đ
        </AppText>
      </AppView>
    </AppView>
  );
};

export default Meta;

const styles = StyleSheet.create({
  list: {
    minHeight: 50,
  },
});
