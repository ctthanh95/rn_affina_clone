import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {AppView, Empty} from '@components';
import ItemProduct from './ItemProduct';
import {PRIMARY} from '@utils/colors';

type Props = {
  data: any;
  refreshing: boolean;
  onRefresh: () => void;
  onProductDetail: (id: string) => void;
};

const ListProduct = ({data, refreshing, onRefresh, onProductDetail}: Props) => {
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
        refreshControl={
          <RefreshControl
            colors={[PRIMARY]}
            tintColor={PRIMARY}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </AppView>
  );
};

export default ListProduct;
