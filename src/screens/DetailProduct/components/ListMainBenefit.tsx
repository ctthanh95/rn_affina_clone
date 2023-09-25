import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {AppText, AppView} from '@components';
import {ms, s} from '@utils/responsive';
import {BLACK, WHITE} from '@utils/colors';
import {Cash} from '@utils/svg';
import {CONTENT} from '@utils/fontStyle';
import {numberWithCommas} from '@utils/global';

const Item = ({
  item: {name, listMaximumAmountMainBenefit},
  isShowLine,
}: TItem) => (
  <AppView
    row
    paddingBottom={ms(12)}
    marginBottom={ms(12)}
    marginHorizontal={ms(12)}
    style={isShowLine && styles.line}>
    <AppView backgroundColor={WHITE} circle={s(56)} center>
      <Cash />
    </AppView>
    <AppView marginLeft={ms(12)} justifyCenter flex>
      <AppText
        style={CONTENT.medium_14}
        color={BLACK[100]}
        marginBottom={ms(4)}>
        {name}
      </AppText>
      <AppText style={CONTENT.bold_16} color={BLACK[100]}>
        {numberWithCommas(listMaximumAmountMainBenefit[0].maximumAmount)} đ
      </AppText>
    </AppView>
  </AppView>
);

const ListMainBenefit = ({data}: TListMainBenefit) => {
  return (
    <AppView style={styles.list}>
      <FlashList
        data={data}
        estimatedItemSize={200}
        keyExtractor={(item: any) => item.id}
        renderItem={({item, index}: any) => (
          <Item item={item} isShowLine={index !== data.length - 1} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </AppView>
  );
};

export default ListMainBenefit;

const styles = StyleSheet.create({
  list: {
    minHeight: 50,
    marginTop: ms(8),
    backgroundColor: BLACK[3],
    borderRadius: ms(20),
    paddingTop: ms(12),
  },
  line: {
    borderBottomWidth: 1,
    borderColor: BLACK[10],
  },
});

type TListMainBenefit = {
  data: any;
};

type TItem = {
  item: any;
  isShowLine: boolean;
};
