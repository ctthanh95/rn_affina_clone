import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {AppText, AppView, Checkbox, Empty} from '@components';
import {ms} from '@utils/responsive';
import {BLACK} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';

const Item = ({item, isLast, onSelectProvider}: TItem) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChecked = () => {
    setIsChecked(!isChecked);
    onSelectProvider(item.id);
  };
  const description: string = ` (${item.listProduct.length} sản phẩm)`;
  return (
    <AppView style={[styles.item, isLast ? {} : styles.boder]}>
      <Checkbox
        isChecked={isChecked}
        onCheckbox={handleChecked}
        children={
          <AppText style={CONTENT.bold_16}>
            {item.providerName}
            <AppText style={CONTENT.medium_16}>{description}</AppText>
          </AppText>
        }
      />
    </AppView>
  );
};

const ListHomeInsurance = ({data, onSelectProvider}: TList) => {
  const lengthData = data.length;
  return (
    <>
      {lengthData ? (
        <AppView
          paddingTop={ms(12)}
          paddingLeft={ms(12)}
          marginBottom={ms(20)}
          radius={ms(12)}
          borderWidth={1}
          borderColor={BLACK[10]}>
          {data.map((item: any, index: number) => (
            <Item
              item={item}
              isLast={index === data.length - 1}
              key={item.id}
              onSelectProvider={onSelectProvider}
            />
          ))}
        </AppView>
      ) : (
        <Empty />
      )}
    </>
  );
};

export default ListHomeInsurance;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ms(12),
  },
  boder: {
    borderBottomWidth: 1,
    borderBottomColor: BLACK[10],
    paddingBottom: ms(12),
  },
});

type TList = {
  data: any;
  onSelectProvider: (id: string) => void;
};

type TItem = {
  item: any;
  isLast: boolean;
  onSelectProvider: (id: string) => void;
};
