import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {AppText, AppView} from '@components';
import {ms, s, vs} from '@utils/responsive';
import {BACKGROUND, WHITE} from '@utils/colors';
import {Affina} from '@utils/svg';
import {CONTENT} from '@utils/fontStyle';

type Props = {
  data: any;
};

const ItemNotification = ({item}: any) => {
  return (
    <TouchableOpacity style={styles.item} activeOpacity={0.9}>
      <AppView
        circle={s(48)}
        center
        backgroundColor={BACKGROUND}
        marginRight={ms(16)}>
        <Affina />
      </AppView>
      <AppView flex justifySpaceBetween>
        <AppView row justifySpaceBetween>
          <AppText style={CONTENT.bold_14} numberOfLines={1} flex>
            {item.title}
          </AppText>
          <AppText marginLeft={ms(16)} style={CONTENT.medium_12}>
            {item.time}
          </AppText>
        </AppView>
        <AppText numberOfLines={1} style={CONTENT.bold_12}>
          {item.content}
        </AppText>
      </AppView>
    </TouchableOpacity>
  );
};

const ListNotification = ({data}: Props) => {
  return (
    <FlashList
      data={data}
      estimatedItemSize={200}
      renderItem={ItemNotification}
    />
  );
};

export default ListNotification;

const styles = StyleSheet.create({
  item: {
    height: vs(72),
    backgroundColor: WHITE,
    borderRadius: ms(20),
    marginBottom: ms(16),
    paddingHorizontal: ms(16),
    paddingVertical: ms(12),
    alignItems: 'center',
    flexDirection: 'row',
  },
});
