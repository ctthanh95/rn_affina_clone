import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {AppView} from '@components';
import ItemNormal from './ItemNormal';
import ListHeader from './ListHeader';

type Props = {
  data: any;
};

const ListNews = ({data}: Props) => {
  const dataHot = data.filter((item: any) => item.newsType === 1);
  const dataNormal = data.filter((item: any) => item.newsType === 0);

  const ListHeaderComponent = dataHot?.length ? (
    <ListHeader data={dataHot} />
  ) : null;

  return (
    <AppView flex>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataNormal}
        renderItem={({item}: any) => <ItemNormal item={item} />}
        keyExtractor={(item: any) => item.newsId}
        ListHeaderComponent={ListHeaderComponent}
      />
    </AppView>
  );
};

export default ListNews;

const styles = StyleSheet.create({});
