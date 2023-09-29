import React from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import {AppView, AppText, AppImage} from '@components';
import {useAppSelector} from '@hooks/redux';
import {
  selectHostStaticResource,
  selectListGroupProgram,
} from '@slices/configSlice';
import {WHITE} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {s, ms, vs, WIDTH} from '@utils/responsive';
import {getLink, removeTagHtml} from '@utils/global';

type Props = {
  item: any;
  onSelectItem: (item: any) => void;
};

const ItemProduct = ({item, onSelectItem}: Props) => {
  const hostStaticResource = useAppSelector(selectHostStaticResource);
  const listGroupProgram = useAppSelector(selectListGroupProgram);

  const itemProgram: any = listGroupProgram.find(
    (element: any) => element.groupName == item.groupName,
  );

  const sourceImageBackground = () => {
    if (item.groupBackground) {
      return {uri: getLink(hostStaticResource, item.groupBackground)};
    }
    if (itemProgram) {
      return {uri: getLink(hostStaticResource, itemProgram.background)};
    }
    return {};
  };

  const uriImage = () => {
    if (item.groupLogo) {
      return item.groupLogo;
    }
    if (itemProgram) {
      return itemProgram.icon;
    }
    return '';
  };

  const content = () => {
    if (itemProgram) return removeTagHtml(itemProgram.content);
  };

  const onPress = () => {
    onSelectItem(item);
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <ImageBackground
        style={styles.item}
        imageStyle={styles.imageBackground}
        source={sourceImageBackground()}>
        <AppView
          circle={s(40)}
          backgroundColor={WHITE}
          center
          overflow="hidden">
          <AppImage uri={uriImage()} style={styles.imageLogo} />
        </AppView>
        <AppText
          flexGrow
          numberOfLines={2}
          style={CONTENT.bold_12}
          marginVertical={ms(12)}>
          {item.groupName}
        </AppText>
        {content() ? (
          <AppText
            numberOfLines={2}
            style={CONTENT.semibold_10}
            marginTop={ms(4)}>
            {content()}
          </AppText>
        ) : null}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ItemProduct;

// 2 * 12 : padding between items
// /3 : 3 items
const widthItem = (WIDTH - 2 * ms(12)) / 3;

const styles = StyleSheet.create({
  item: {
    width: ms(widthItem),
    padding: ms(12),
    marginBottom: ms(12),
    height: vs(140),
    backgroundColor: '#FFCAE7',
    borderRadius: ms(16),
  },
  imageBackground: {
    borderRadius: ms(16),
  },
  imageLogo: {
    width: ms(40),
    height: ms(40),
  },
});
