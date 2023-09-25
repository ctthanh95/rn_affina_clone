import {AppView, AppText, AppImage} from '@components';
import {navigate} from '@navigation/RootNavigation';
import {DETAIL_NEWS} from '@navigation/screens';
import {WHITE, BLACK} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {formatTime, removeTagHtml} from '@utils/global';
import {ms, s} from '@utils/responsive';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type Props = {
  item: any;
};

const FAKE_DATA_SLIDE = [
  {
    id: 1,
    data: 'Ngày 14, 06, 2022 – 12:32',
    title:
      'Generalli ra mắt dòng sản phẩm mới dành cho trẻ em, hoa hồng lên đến 40%',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKNtcK6iCh9zL6r2yLVm8xjrurRMfeAS-rRqLNkjw1&s',
  },
  {
    id: 2,
    data: 'Ngày 14, 06, 2022 – 12:32',
    title:
      'Generalli ra mắt dòng sản phẩm mới dành cho trẻ em, hoa hồng lên đến 40%',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKNtcK6iCh9zL6r2yLVm8xjrurRMfeAS-rRqLNkjw1&s',
  },
];

const ItemNormal = ({item}: Props) => {
  const {newsId, newsImage1, createdAt, newsName, newsContent} = item;
  const description = removeTagHtml(newsContent);
  const onPress = () => {
    navigate(DETAIL_NEWS, {newsId, newsName});
  };
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <AppView
        row
        padding={ms(12)}
        marginRight={ms(23)}
        overflow="hidden"
        marginBottom={ms(12)}
        backgroundColor={WHITE}
        radius={ms(20)}>
        <AppView flex justifySpaceBetween>
          <AppText style={CONTENT.bold_16} color={BLACK[100]} numberOfLines={2}>
            {newsName}
          </AppText>
          <AppText
            style={CONTENT.medium_12}
            color={BLACK[100]}
            numberOfLines={2}>
            {description}
          </AppText>
          <AppText style={CONTENT.bold_12} color={BLACK[100]}>
            {formatTime(createdAt, 'datetime')}
          </AppText>
        </AppView>
        <AppImage uri={newsImage1} style={styles.image} resizeMode="contain" />
      </AppView>
    </TouchableOpacity>
  );
};

export default ItemNormal;

const styles = StyleSheet.create({
  image: {
    height: s(100),
    width: s(100),
  },
});
