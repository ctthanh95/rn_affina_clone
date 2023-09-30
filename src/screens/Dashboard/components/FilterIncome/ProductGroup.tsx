import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppText, AppView, Checkbox} from '@components';
import {BLACK, PRIMARY} from '@utils/colors';
import {CONTENT, LINK} from '@utils/fontStyle';
import {ms} from '@utils/responsive';

const PRODUCT_GROUPS = [
  {
    title: 'Sức khỏe',
    id: 3,
  },
  {
    title: 'Xe máy',
    id: 1,
  },
  {
    title: 'Du lịch',
    id: 4,
  },
  {
    title: 'Nhà Cửa',
    id: 5,
  },
  {
    title: 'Ô tô',
    id: 2,
  },
];

type Props = {
  onProductGroup: (id: number) => void;
  onResetProductGroup: () => void;
};

type TItem = {
  item: any;
  onSelected: (id: number) => void;
};

const ItemFilter = ({item, onSelected}: TItem) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChecked = () => {
    setIsChecked(!isChecked);
    onSelected(item.id);
  };
  return (
    <AppView style={styles.item}>
      <Checkbox
        isChecked={isChecked}
        onCheckbox={handleChecked}
        children={<AppText style={CONTENT.bold_16}>{item.title}</AppText>}
      />
    </AppView>
  );
};

const ProductGroup = ({onProductGroup, onResetProductGroup}: Props) => {
  const [key, setKey] = useState(Date.now());
  const handleReset = () => {
    setKey(Date.now());
    onResetProductGroup();
  };
  return (
    <AppView>
      <AppView row justifySpaceBetween marginBottom={ms(20)} alignCenter>
        <AppText style={CONTENT.bold_14} color={BLACK[30]}>
          NHÓM SẢN PHẨM
        </AppText>
        <TouchableOpacity activeOpacity={0.9} onPress={handleReset}>
          <AppText style={LINK[14]} color={PRIMARY}>
            Xoá
          </AppText>
        </TouchableOpacity>
      </AppView>
      <View key={key}>
        {PRODUCT_GROUPS.map((item: any) => (
          <ItemFilter item={item} key={item.id} onSelected={onProductGroup} />
        ))}
      </View>
    </AppView>
  );
};

export default ProductGroup;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ms(16),
  },
});
