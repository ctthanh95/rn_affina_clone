import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import AppText from '../AppText';
import {SELECT_BUTTON, BLACK, WHITE} from '@utils/colors';
import {ms} from '@utils/responsive';
import {CONTENT} from '@utils/fontStyle';
import AppView from '../AppView';

type Props = {
  value?: number;
  data: {id: number; title: string}[];
  onChange: (id: number) => void;
};

type Item = {
  item: {id: number; title: string};
  onSelected: (id: number) => void;
  isSelectItem: boolean;
};

const Item = ({item, onSelected, isSelectItem}: Item) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.item, isSelectItem && styles.active]}
      onPress={() => onSelected(item.id)}>
      <AppText
        style={CONTENT.medium_16}
        color={isSelectItem ? WHITE : BLACK[100]}>
        {item.title}
      </AppText>
    </TouchableOpacity>
  );
};

const SelectGroup = ({value, data, onChange}: Props) => {
  const [selectItem, setSelectItem] = useState(data[0].id);
  const handleSelected = (id: number) => {
    setSelectItem(id);
    onChange(id);
  };
  useEffect(() => {
    if (value !== undefined) {
      setSelectItem(value);
    }
  }, []);

  return (
    <AppView marginBottom={ms(20)}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {data.map(item => (
          <Item
            key={item.id}
            item={item}
            onSelected={handleSelected}
            isSelectItem={item.id === selectItem}
          />
        ))}
      </ScrollView>
    </AppView>
  );
};

export default SelectGroup;

const styles = StyleSheet.create({
  item: {
    borderRadius: ms(20),
    paddingVertical: ms(12),
    paddingHorizontal: ms(20),
    backgroundColor: BLACK[3],
    marginRight: ms(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: SELECT_BUTTON,
  },
});
