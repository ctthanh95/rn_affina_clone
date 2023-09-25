import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppText, AppView} from '@components';
import {FlashList} from '@shopify/flash-list';
import ItemProgram from './ItemProgram';
import {ms} from '@utils/responsive';

type Props = {
  data: any;
  onSelectItem: (data: any) => void;
};

const ListProgram = ({data, onSelectItem}: Props) => {
  return (
    <AppView flex padding={ms(12)}>
      <FlashList
        data={data}
        estimatedItemSize={200}
        keyExtractor={(item: any) => item.id}
        renderItem={({item}: any) => (
          <ItemProgram item={item} onPress={onSelectItem} />
        )}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </AppView>
  );
};

export default ListProgram;

const styles = StyleSheet.create({});
