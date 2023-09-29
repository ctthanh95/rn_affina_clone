import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {debounce} from 'lodash';
import {keyExtractor} from '@utils/global';
import {AppView, Empty, SearchInput} from '@components';
import {PRIMARY} from '@utils/colors';

import Item from './Item';

type Props = {
  data: any;
  refreshing: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
  onSearch: (search: string) => void;
  onDelete: () => void;
};

const ListContract = ({
  data,
  refreshing,
  onRefresh,
  onLoadMore,
  onSearch,
  onDelete,
}: Props) => {
  const lengthData = data.length;
  const debounceOnEndReached = debounce(onLoadMore, 300);

  return (
    <AppView flex>
      <SearchInput onSearch={onSearch} onDelete={onDelete} />
      {lengthData ? (
        <AppView flex>
          <FlatList
            data={data}
            keyExtractor={keyExtractor}
            onEndReachedThreshold={0.1}
            initialNumToRender={5}
            renderItem={({item}) => <Item item={item} />}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                colors={[PRIMARY]}
                tintColor={PRIMARY}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            onEndReached={debounceOnEndReached}
          />
        </AppView>
      ) : (
        <Empty />
      )}
    </AppView>
  );
};

export default ListContract;
