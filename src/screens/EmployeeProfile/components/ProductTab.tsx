import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {AppImage, AppText, AppView} from '@components';
import {ms, s, vs} from '@utils/responsive';
import {BACKGROUND, BLACK, SELECT_BUTTON, WHITE} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';

type Props = {};

const DATA = [
  {
    id: 1,
    title: 'First Item',
  },
  {
    id: 2,
    title: 'Second Item',
  },
  {
    id: 11,
    title: 'First Item',
  },
  {
    id: 22,
    title: 'Second Item',
  },

  {
    id: 13,
    title: 'First Item',
  },
  {
    id: 42,
    title: 'Second Item',
  },
  {
    id: 15,
    title: 'First Item',
  },
  {
    id: 26,
    title: 'Second Item',
  },

  {
    id: 16,
    title: 'First Item',
  },
  {
    id: 27,
    title: 'Second Item',
  },
  {
    id: 18,
    title: 'First Item',
  },
  {
    id: 288,
    title: 'Second Item',
  },
  {
    id: 188888,
    title: 'First Item',
  },
  {
    id: 88882,
    title: 'Second Item',
  },
];

const ProductLabel = ({element}) => (
  <AppView
    backgroundColor={BACKGROUND}
    radius={ms(8)}
    paddingVertical={ms(2)}
    paddingHorizontal={ms(8)}
    marginRight={ms(10)}>
    <AppText style={CONTENT.semibold_10} color={BLACK[100]}>
      Benefits
    </AppText>
  </AppView>
);

const ProductItem = ({item}) => (
  <TouchableOpacity activeOpacity={0.9} style={styles.item}>
    <AppView padding={ms(16)} flex justifySpaceBetween>
      <AppView row justifySpaceBetween alignCenter>
        <AppText style={CONTENT.bold_16} color={BLACK[100]}>
          Benefits One - B1
        </AppText>
        <AppImage uri="" style={styles.logo} />
      </AppView>
      <AppView row>
        {[1, 2, 3].map(element => (
          <ProductLabel key={element} element={element} />
        ))}
      </AppView>
    </AppView>
    <AppView style={styles.decription}>
      <AppText style={CONTENT.medium_12} color={WHITE} numberOfLines={1}>
        Hoa hồng (không bao gồm thuế) lên đến
      </AppText>
      <AppText style={CONTENT.bold_16} color={WHITE}>
        15%
      </AppText>
    </AppView>
  </TouchableOpacity>
);

const keyExtractor = (item: any) => item.id.toString();

const ProductTab = (props: Props) => {
  return (
    <AppView flex>
      <FlashList
        data={DATA}
        estimatedItemSize={200}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <AppText
            style={CONTENT.bold_20}
            color={BLACK[100]}
            marginBottom={ms(12)}>
            Có thể bán
          </AppText>
        }
        renderItem={ProductItem}
      />
    </AppView>
  );
};

export default ProductTab;

const styles = StyleSheet.create({
  list: {
    paddingBottom: ms(20),
  },
  item: {
    height: vs(130),
    borderRadius: ms(12),
    borderWidth: 2,
    backgroundColor: WHITE,
    borderColor: BLACK[3],
    marginBottom: ms(12),
  },
  logo: {
    width: s(40),
    height: vs(25),
  },
  decription: {
    flexDirection: 'row',
    alignItems: 'center',
    height: vs(44),
    backgroundColor: SELECT_BUTTON,
    borderBottomLeftRadius: ms(12),
    borderBottomRightRadius: ms(12),
    paddingHorizontal: ms(16),
    justifyContent: 'space-between',
  },
});
