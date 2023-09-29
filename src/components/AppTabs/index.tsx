import React, {useRef, useState} from 'react';
import {StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {AppText, AppView} from '@components';
import {BLACK, SELECT_BUTTON} from '@utils/colors';
import {ms, vs} from '@utils/responsive';
import {CONTENT} from '@utils/fontStyle';

const Item = ({
  item,
  index,
  keyId,
  keyLabel,
  isTabSelected,
  isLastItem,
  onPress,
}: TItem) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={isLastItem ? styles.lastItem : styles.item}
      onPress={() => onPress(item[keyId], index)}>
      <AppView row alignCenter marginBottom={ms(8)} paddingHorizontal={ms(8)}>
        <AppText
          style={CONTENT.bold_14}
          color={isTabSelected ? BLACK[100] : BLACK[30]}>
          {item[keyLabel].toUpperCase()}
        </AppText>
      </AppView>
      {isTabSelected ? (
        <AppView height={vs(4)} backgroundColor={SELECT_BUTTON} width="100%" />
      ) : null}
    </TouchableOpacity>
  );
};

const AppTabs = ({data, keyLabel, keyId = 'id', onPress}: Props) => {
  const flatListRef: any = useRef(null);
  const [tabSelected, setTabSelected] = useState(data[0][keyId]);
  const handlePress = (id: string, index: number) => {
    setTabSelected(id);
    onPress(id);
    flatListRef?.current.scrollToIndex({animated: true, index});
  };
  return (
    <AppView marginTop={ms(12)} marginVertical={ms(20)}>
      <FlatList
        data={data}
        horizontal
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: any) => item.id}
        renderItem={({item, index}: any) => (
          <Item
            item={item}
            index={index}
            keyId={keyId}
            keyLabel={keyLabel}
            onPress={handlePress}
            isTabSelected={item.id === tabSelected}
            isLastItem={index === data.length - 1}
          />
        )}
      />
    </AppView>
  );
};

export default AppTabs;

const styles = StyleSheet.create({
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
  keyId: string;
  keyLabel: string;
  isLastItem: boolean;
  isTabSelected: boolean;
  onPress: (id: string, index: number) => void;
};

type Props = {
  data: any;
  keyLabel: string;
  keyId?: string;
  onPress: (id: any) => void;
};
