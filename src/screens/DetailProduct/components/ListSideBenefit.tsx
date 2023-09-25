import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {AppText, AppView} from '@components';
import {ms, s} from '@utils/responsive';
import {BLACK, PRIMARY, WHITE} from '@utils/colors';
import {Cart, Cash} from '@utils/svg';
import {CONTENT} from '@utils/fontStyle';
import {numberWithCommas} from '@utils/global';

const sortArr = (arr: any, key: string) => {
  arr.sort((a: any, b: any) => b[key] - a[key]);
  return arr;
};

const Item = ({item, onSetFee}: TItem) => {
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    setIsSelected(false);
  }, [item]);

  const {name, listFeeAndMaximumAmountSideBenefit} = item;
  const arrMaximumAmountArr = sortArr(
    listFeeAndMaximumAmountSideBenefit,
    'maximumAmount',
  );
  const arrFee = sortArr(listFeeAndMaximumAmountSideBenefit, 'fee');
  const maximumAmount = arrMaximumAmountArr[0].maximumAmount || 0;
  const fee = arrFee[0].fee || 0;
  const symbol = isSelected ? '+' : '-';
  const feeString = `${symbol} ${numberWithCommas(fee)} đ`;
  const backgroundColor = isSelected ? PRIMARY : WHITE;
  const color = isSelected ? WHITE : BLACK[30];

  const handleSelected = () => {
    setIsSelected(!isSelected);
    onSetFee(isSelected, fee, item.id);
  };

  return (
    <AppView
      radius={ms(20)}
      backgroundColor={BLACK[3]}
      overflow="hidden"
      marginBottom={ms(16)}>
      <AppView row padding={ms(12)}>
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
            {numberWithCommas(maximumAmount)} đ
          </AppText>
        </AppView>
      </AppView>
      <TouchableOpacity activeOpacity={0.9} onPress={handleSelected}>
        <AppView
          row
          backgroundColor={backgroundColor}
          padding={ms(12)}
          alignCenter>
          <Cart fill={color} />
          <AppText style={CONTENT.bold_10} color={color} marginLeft={ms(12)}>
            Phí bảo hiểm
          </AppText>
          <AppView flex alignEnd>
            <AppText style={CONTENT.bold_16} color={color}>
              {feeString}
            </AppText>
          </AppView>
        </AppView>
      </TouchableOpacity>
    </AppView>
  );
};

const ListSideBenefit = ({data, onSetFee}: TListSideBenefit) => {
  return (
    <>
      {data.map((item: any) => (
        <Item item={item} key={item.id} onSetFee={onSetFee} />
      ))}
    </>
  );
};

export default ListSideBenefit;

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 1,
    borderColor: BLACK[10],
  },
});

type TListSideBenefit = {
  data: any;
  onSetFee: (isSelectes: boolean, money: number, id: string) => void;
};

type TItem = {
  item: any;
  onSetFee: (isSelectes: boolean, money: number, id: string) => void;
};
