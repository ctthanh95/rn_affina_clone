import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {AppImage, AppView, AppText} from '@components';
import {BLACK, WHITE} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {vs, ms, width} from '@utils/responsive';
import moment from 'moment';
import {navigate} from '@navigation/RootNavigation';
import {DETAIL_NEWS} from '@navigation/screens';
const WIDTH = width - 2 * ms(23);

type Props = {
  item: any;
};

const ItemHot = ({item}: Props) => {
  const {newsId, newsImage2, createdAt, newsName} = item;
  const onPress = () => {
    navigate(DETAIL_NEWS, {newsId, newsName});
  };
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <AppView
        radius={ms(20)}
        overflow="hidden"
        backgroundColor={WHITE}
        marginRight={ms(23)}>
        <AppImage
          uri={newsImage2}
          style={{
            height: vs(148),
            width: WIDTH,
          }}
        />
        <AppView flex paddingHorizontal={ms(12)} marginTop={ms(12)}>
          <AppText style={CONTENT.semibold_12} color={BLACK[50]}>
            Ngày {moment(createdAt).format('DD, MM, YYYY - HH:mm')}
          </AppText>
          <AppText
            style={CONTENT.bold_16}
            color={BLACK[100]}
            numberOfLines={2}
            marginVertical={ms(12)}>
            {newsName}
          </AppText>
        </AppView>
      </AppView>
    </TouchableOpacity>
  );
};

export default ItemHot;

const styles = StyleSheet.create({});
