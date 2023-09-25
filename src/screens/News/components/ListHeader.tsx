import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
  interpolateColor,
} from 'react-native-reanimated';
import {AppView} from '@components';
import ItemHot from './ItemHot';
import {ms, width} from '@utils/responsive';
import {BLACK, SELECT_BUTTON} from '@utils/colors';

type TListHeader = {
  data: any;
};
type TPaginationDot = {
  data: any;
  scrollX: any;
};

const WIDTH = width - 2 * ms(23);

const PaginationDot = ({data, scrollX}: TPaginationDot) => {
  return (
    <AppView row center marginRight={ms(23)} marginVertical={ms(12)}>
      {data.map((item: any, index: number) => {
        const INPUT = [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH];
        const animatedStyles = useAnimatedStyle(() => {
          const opacity = interpolate(
            scrollX.value,
            INPUT,
            [0.5, 1, 0.5],
            Extrapolation.CLAMP,
          );
          const width = interpolate(
            scrollX.value,
            INPUT,
            [8, 16, 8],
            Extrapolation.CLAMP,
          );
          const backgroundColor = interpolateColor(scrollX.value, INPUT, [
            BLACK[30],
            SELECT_BUTTON,
            BLACK[30],
          ]);
          return {
            opacity,
            width,
            backgroundColor,
          };
        });
        return (
          <Animated.View style={[styles.dot, animatedStyles]} key={index} />
        );
      })}
    </AppView>
  );
};

const ListHeader = ({data}: TListHeader) => {
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x;
  });
  return (
    <AppView marginBottom={ms(16)}>
      <Animated.FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item}: any) => <ItemHot item={item} />}
        keyExtractor={(item: any) => item.newsId}
        onScroll={scrollHandler}
      />
      <PaginationDot data={data} scrollX={scrollX} />
    </AppView>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: SELECT_BUTTON,
    marginRight: 4,
  },
});
