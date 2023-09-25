import React from 'react';
import {FlatList} from 'react-native';
import {AppView, Empty} from '@components';
import ItemProduct from './ItemProduct';

type Props = {
  data: any;
  onProductDetail: (id: string) => void;
};

const ListProduct = ({data, onProductDetail}: Props) => {
  return (
    <AppView flex>
      <FlatList
        data={data}
        keyExtractor={(item: any) => item.id}
        renderItem={({item}: any) => (
          <ItemProduct item={item} onProductDetail={onProductDetail} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Empty />}
      />
    </AppView>
  );
};

export default ListProduct;
