import React from 'react';
import {Text} from 'react-native';
import {AppTabs, AppView, Container} from '@components';
import {ms} from '@utils/responsive';
import ListContract from './components/ListContract';
import styles from './styles';

const TAB = [
  {id: 3, title: 'Chờ thanh toán'},
  {id: 1, title: 'Hoàn Thành'},
  {id: -1, title: 'Từ Chối'},
];

type Props = {
  data: any;
  refreshing: boolean;
  onStatus: (id: number) => void;
  onRefresh: () => void;
  onLoadMore: () => void;
  onSearch: (search: string) => void;
  onDelete: () => void;
};

const View = ({
  data,
  refreshing,
  onRefresh,
  onStatus,
  onLoadMore,
  onSearch,
  onDelete,
}: Props) => {
  return (
    <Container isAuth title="Hợp đồng">
      <AppView paddingHorizontal={ms(23)} flex>
        <AppTabs data={TAB} keyLabel="title" onPress={onStatus} />
        {/* <Text>{data.length}</Text> */}
        <ListContract
          data={data}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onLoadMore={onLoadMore}
          onSearch={onSearch}
          onDelete={onDelete}
        />
      </AppView>
    </Container>
  );
};

export default View;
