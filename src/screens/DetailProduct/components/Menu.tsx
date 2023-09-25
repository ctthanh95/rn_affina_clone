import React, {useRef} from 'react';
import {StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {AppText, AppView} from '@components';
import {BLACK, SELECT_BUTTON} from '@utils/colors';
import {ms, vs} from '@utils/responsive';
import {CONTENT} from '@utils/fontStyle';

const Item = ({item, index, isMenuSeleted, isLastItem, onPress}: TItem) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={isLastItem ? styles.lastItem : styles.item}
      onPress={() => onPress(item.id, index)}>
      <AppView row alignCenter marginBottom={ms(8)} paddingHorizontal={ms(8)}>
        <AppText
          style={CONTENT.bold_14}
          color={isMenuSeleted ? BLACK[100] : BLACK[30]}>
          {item.packageName.toUpperCase()}
        </AppText>
      </AppView>
      {isMenuSeleted ? (
        <AppView height={vs(4)} backgroundColor={SELECT_BUTTON} width="100%" />
      ) : null}
    </TouchableOpacity>
  );
};

const Menu = ({data, menuSeleted, onMenuSelected}: TMenu) => {
  const flatListRef: any = useRef(null);
  const handlePress = (id: string, index: number) => {
    onMenuSelected(id);
    flatListRef?.current.scrollToIndex({animated: true, index});
  };
  return (
    <AppView>
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
            onPress={handlePress}
            isMenuSeleted={item.id === menuSeleted}
            isLastItem={index === data.length - 1}
          />
        )}
      />
    </AppView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    marginBottom: ms(12),
  },
  border: {
    borderBottomWidth: vs(4),
    borderBottomColor: SELECT_BUTTON,
  },
  item: {
    marginRight: ms(16),
  },
  lastItem: {
    marginRight: 0,
  },
});

type TItem = {
  item: any;
  index: number;
  isMenuSeleted: boolean;
  isLastItem: boolean;
  onPress: (id: string, index: number) => void;
};

type TMenu = {
  data: any;
  menuSeleted: string;
  onMenuSelected: (id: string) => void;
};
