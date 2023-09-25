import React, {useState, memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {AppText, AppView} from '@components';
import {FlashList} from '@shopify/flash-list';
import {CONTENT} from '@utils/fontStyle';
import {Down} from '@utils/svg';
import {ms} from '@utils/responsive';
import ItemProduct from './ItemProduct';
import {navigate} from '@navigation/RootNavigation';
import {FILTER_INSURANCE} from '@navigation/screens';

type Props = {
  title: string;
  type: number;
  data: any;
};

const SectionListProduct = ({title, type, data}: Props) => {
  const [isExtend, setIsExtend] = useState(true);

  const animated = useDerivedValue(() => {
    return isExtend ? withTiming(1) : withTiming(0);
  }, [isExtend]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${animated.value * 180}deg`}],
    };
  }, [animated]);

  const handleExtend = () => {
    setIsExtend(!isExtend);
  };

  const handleSelectItem = (item: any) => {
    if (type === 0) {
      navigate(FILTER_INSURANCE, {
        item,
      });
    }
  };

  return (
    <AppView>
      <AppView row alignCenter justifySpaceBetween marginBottom={ms(12)}>
        <AppText style={CONTENT.bold_20}>{title}</AppText>
        <TouchableOpacity activeOpacity={0.9} onPress={handleExtend}>
          <Animated.View style={animatedStyles}>
            <Down />
          </Animated.View>
        </TouchableOpacity>
      </AppView>
      {isExtend ? (
        <AppView style={styles.list}>
          <FlashList
            data={data}
            estimatedItemSize={200}
            keyExtractor={(item: any) => item.id}
            renderItem={({item}: any) => (
              <ItemProduct item={item} onSelectItem={handleSelectItem} />
            )}
            numColumns={3}
            showsVerticalScrollIndicator={false}
          />
        </AppView>
      ) : null}
    </AppView>
  );
};

export default memo(SectionListProduct);

const styles = StyleSheet.create({
  list: {
    minHeight: 50,
  },
});
