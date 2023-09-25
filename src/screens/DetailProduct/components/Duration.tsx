import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {isEqual} from 'lodash';
import {AppText, AppView} from '@components';
import {BLACK, PRIMARY} from '@utils/colors';
import {CONTENT, TITLE} from '@utils/fontStyle';
import {ms} from '@utils/responsive';
import {Check} from '@utils/svg';
import {getValue} from './Cart';

const Item = ({item, isSelected, onPress}: TItem) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => onPress(item)}>
      <AppView row alignCenter paddingBottom={ms(8)}>
        <AppText
          marginRight={ms(4)}
          style={CONTENT.medium_16}
          color={isSelected ? PRIMARY : BLACK[100]}>
          {getValue(item)}
        </AppText>
        {isSelected && <Check stroke={PRIMARY} />}
      </AppView>
      <AppView height={1} backgroundColor={BLACK[10]} marginBottom={ms(12)} />
    </TouchableOpacity>
  );
};

const Duration = ({data, itemSelected, onSelectDuration}: TDuration) => {
  return (
    <AppView paddingHorizontal={ms(23)} marginVertical={ms(16)}>
      <AppText color={PRIMARY} style={TITLE[24]}>
        Thời hạn bảo hiểm
      </AppText>
      <AppView marginTop={ms(16)}>
        {data?.map((item: any, index: number) => (
          <Item
            item={item}
            key={item.productId}
            onPress={onSelectDuration}
            isSelected={isEqual(itemSelected, item)}
          />
        ))}
      </AppView>
    </AppView>
  );
};

export default Duration;

const styles = StyleSheet.create({});

type TDuration = {
  data: any;
  itemSelected: string;
  onSelectDuration: (item: any) => void;
};

type TItem = {
  item: any;
  isSelected: boolean;
  onPress: (item: any) => void;
};
