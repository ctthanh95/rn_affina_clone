import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {navigate} from '@navigation/RootNavigation';
import {DETAIL_CUSTOMER} from '@navigation/screens';
import {CUSTOMER_TYPE} from '@utils/constants';
import {ms} from '@utils/responsive';
import Action from './Action';
import Agency from './Agency';
import Info from './Info';
import {Empty} from '@components';

const ItemCustomer = ({item}: TItem) => {
  const customerType = CUSTOMER_TYPE.find(
    element => element.id === item.status,
  );

  const handleDetailCustomer = () => {
    navigate(DETAIL_CUSTOMER, {
      id: item.id,
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.item}
      onPress={handleDetailCustomer}>
      <Info
        name={item.name}
        createdAt={item.createdAt}
        title={customerType?.title}
        color={customerType?.color}
      />
      <Agency saleSetBy={item.saleSetBy} />
      <Action phone={item?.phone} />
    </TouchableOpacity>
  );
};

const ListCustomer = ({data}: TListCustomer) => {
  return (
    <FlashList
      data={data}
      estimatedItemSize={200}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item: any) => item.id}
      renderItem={({item}: any) => <ItemCustomer item={item} />}
      ListEmptyComponent={Empty}
    />
  );
};

export default ListCustomer;

const styles = StyleSheet.create({
  item: {
    marginBottom: ms(12),
  },
});

type TListCustomer = {
  data: any;
};

type TItem = {
  item: any;
};
