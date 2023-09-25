import {AppImage, AppText, AppView} from '@components';
import {FlashList} from '@shopify/flash-list';
import {BACKGROUND, BLACK, LIGHT_BACKGROUND, WHITE} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {getTimeFromNow} from '@utils/global';
import {ms, s} from '@utils/responsive';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  data: any;
};

const Item = ({item}: any) => {
  const {name, avatar, content, createdAt} = item;
  return (
    <AppView row marginBottom={ms(16)}>
      <AppImage uri={avatar} style={styles.image} />
      <AppView
        flex
        backgroundColor={LIGHT_BACKGROUND}
        radius={ms(16)}
        paddingVertical={ms(12)}
        paddingHorizontal={ms(16)}>
        <AppView row justifySpaceBetween>
          <AppText
            maxWidth={'70%'}
            style={CONTENT.bold_14}
            color={BLACK[100]}
            numberOfLines={1}>
            {name}
          </AppText>
          <AppText
            style={CONTENT.medium_12}
            numberOfLines={1}
            color={BLACK[100]}
            marginLeft={ms(8)}>
            {getTimeFromNow(createdAt)}
          </AppText>
        </AppView>
        <AppText
          style={CONTENT.medium_14}
          color={BLACK[100]}
          marginTop={ms(12)}>
          {content}
        </AppText>
      </AppView>
    </AppView>
  );
};

const Comment = ({data}: Props) => {
  return (
    <AppView style={styles.list}>
      <FlashList
        data={data}
        renderItem={({item}) => <Item item={item} />}
        estimatedItemSize={200}
        keyExtractor={(item: any) => item.id}
      />
    </AppView>
  );
};

export default Comment;

const styles = StyleSheet.create({
  list: {
    minHeight: 50,
  },
  image: {
    width: s(52),
    height: s(52),
    borderRadius: s(26),
    borderWidth: 2,
    borderColor: WHITE,
    marginRight: ms(8),
  },
});
