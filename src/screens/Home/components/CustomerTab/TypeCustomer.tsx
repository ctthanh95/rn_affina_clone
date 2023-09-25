import React, {useRef} from 'react';
import {StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {ms, s, vs} from '@utils/responsive';
import {AppView, AppText} from '@components';
import {BLACK, PINK, SELECT_BUTTON} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';

const Item = ({item, index, onPress, isSelected, isLastItem}: TItem) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={isLastItem ? styles.lastItem : styles.item}
      onPress={() => onPress(item.id, index)}>
      <AppView row alignCenter marginBottom={ms(8)} paddingHorizontal={ms(4)}>
        <AppText
          style={CONTENT.bold_14}
          color={isSelected ? BLACK[100] : BLACK[30]}>
          {item.title.toUpperCase()} ({item.count || 0})
        </AppText>
        {item.isNew ? (
          <AppView circle={s(8)} backgroundColor={PINK} marginLeft={ms(4)} />
        ) : null}
      </AppView>
      {isSelected ? (
        <AppView height={vs(4)} backgroundColor={SELECT_BUTTON} width="100%" />
      ) : null}
    </TouchableOpacity>
  );
};

const TypeCustomer = ({data, onSetStatus, status}: TTypeCustomer) => {
  const flatListRef: any = useRef(null);
  const hanldePress = (id: number, index: number) => {
    onSetStatus(id);
    flatListRef?.current.scrollToIndex({animated: true, index});
  };
  return (
    <FlatList
      style={styles.container}
      data={data}
      horizontal
      ref={flatListRef}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item: any) => item.id}
      renderItem={({item, index}: any) => (
        <Item
          item={item}
          index={index}
          onPress={hanldePress}
          isSelected={item.id === status}
          isLastItem={index === data.length - 1}
        />
      )}
    />
  );
};

export default TypeCustomer;

const styles = StyleSheet.create({
  container: {
    marginBottom: ms(12),
  },
  item: {
    marginRight: ms(12),
  },
  lastItem: {
    marginRight: 0,
  },
});

type TTypeCustomer = {
  data: any;
  onSetStatus: (status: number) => void;
  status: number;
};

type TItem = {
  item: any;
  index: number;
  onPress: (id: number, index: number) => void;
  isSelected: boolean;
  isLastItem: boolean;
};
